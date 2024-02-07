import React, { useEffect, useState } from 'react';
import {
  Box,
  Checkbox,
  Flex,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import Select from 'react-select';
import Table from '../Table';
import gear from '../../data/gear.js';
// import { limitedData as gear } from '../../data/gear.js';
import _ from 'lodash';

const getUniqueOptions = (arr, key) => {
  const uni =  _.uniqBy(arr, key);
  const opts =  uni.map((item) => {
    // if the key is empty, we want to include it in the list
    if (!item[key]) return { value: '', label: 'other' };
    return { value: item[key], label: item[key] };
  });

  return _.sortBy(opts, ['value']);
};

const levelRange = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

const getMinLevelOptions = (max) => levelRange.filter(l => l <= max).map(l => ({ value: l, label: l }));
const getMaxLevelOptions = (min) => levelRange.filter(l => l >= min).map(l => ({ value: l, label: l }));

const realmOptions = getUniqueOptions(gear, 'realm');
const slotOptions = getUniqueOptions(gear, 'slot');
const effectOptions = getUniqueOptions(gear, 'spell');
const typeOptions = getUniqueOptions(gear, 'type');
const sigilOptions = getUniqueOptions(gear, 'sigil');

const filterWithPredicates = (list, predicates) => (
  list.filter(item => (
    Object.values(predicates).every(predicate => predicate(item))
  ))
);

const Finder = () => {
  // TODO: move to reducer?
  const [matches, setMatches] = useState(gear);
  const [realms, setRealms] = useState([]);
  const [slots, setSlots] = useState([]);
  const [minLevel, setMinLevel] = useState(1);
  const [maxLevel, setMaxLevel] = useState(60);
  const [effects, setEffects] = useState([]);
  const [types, setTypes] = useState([]);
  const [sigils, setSigils] = useState([]);
  const [minLevelOptions, setMinLevelOptions] = useState(getMinLevelOptions(60));
  const [maxLevelOptions, setMaxLevelOptions] = useState(getMaxLevelOptions(1));

  const [sortBy, setSortBy] = useState('realm');
  const [order, setOrder] = useState('asc');
  
  const [showFullInfo, setShowFullInfo] = useState(true);

  useEffect(() => {
    setMinLevelOptions(getMinLevelOptions(maxLevel));
  }, [maxLevel]);

  useEffect(() => {
    setMaxLevelOptions(getMaxLevelOptions(minLevel));
  }, [minLevel]);

  useEffect(() => {
      const predicates = {
        level: (record) => record.level >= minLevel && record.level <= maxLevel,
      };

      const workingTypes = [...types];

      if (realms.length > 0) {
        predicates.realm = (record) => realms.includes(record.realm);
      }

      if (slots.length > 0) {
        predicates.slot = (record) => slots.includes(record.slot);
        // if we're looking for jewels, we also want to include items that don't have a slot
        if (slots.includes('jewel')) {
          workingTypes.push('')
        }
      }

      if (effects.length > 0) {
        predicates.spell = (record) => effects.includes(record.spell);
      }

      if (types.length > 0) {
        predicates.type = (record) => workingTypes.includes(record.type);
      }

      if (sigils.length > 0) {
        predicates.sigil = (record) => sigils.includes(record.sigil);
      }

      const matches = filterWithPredicates(gear, predicates);
      setMatches(matches);
  }, [realms, slots, minLevel, maxLevel, effects, types, sigils]);

  useEffect(() => {
    setMatches(_.orderBy(matches, sortBy, order));
  }, [sortBy, order, matches]);

  const updateSort = (col) => {
    if (col === sortBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setOrder('asc');
    }
  };

  return (
    <Box p="20px">
      <Text fontSize="3xl" color="teal.500">
        Find some gear
      </Text>
        <FormLabel>
          Realms
        </FormLabel>
        <Select
          style={{ maxWidth: "900px" }}
          placeholder="Select one or more realms (or event)"
          isMulti
          onChange={e => setRealms(e.map(r => r.value))}
          options={realmOptions}
        />
        <FormLabel>
          Slots
        </FormLabel>
        <Select
          style={{ maxWidth: "900px" }}
          placeholder="Select one or more slots"
          isMulti
          onChange={e => setSlots(e.map(r => r.value))}
          options={slotOptions}
        />
        <FormLabel>
          Types
        </FormLabel>
        <Select
          style={{ maxWidth: "900px" }}
          placeholder="Select one or more types"
          isMulti
          onChange={e => setTypes(e.map(r => r.value))}
          options={typeOptions}
        />
        <Flex>
          <Box w="200px">
            <FormLabel>
              Minimum Level
            </FormLabel>
            <Select
              placeholder="Minimum Level"
              onChange={e => setMinLevel(e.value)}
              options={minLevelOptions}
            />
          </Box>
          <Box w="200px" marginLeft="20px">
            <FormLabel>
              Maximum Level
            </FormLabel>
            <Select
              placeholder="Maximum Level"
              onChange={e => setMaxLevel(e.value)}
              options={maxLevelOptions}
            />
          </Box>
        </Flex>
        <FormLabel>
          Effects
        </FormLabel>
        <Select
          placeholder="Select one or more effects"
          isMulti
          onChange={e => setEffects(e.map(r => r.value))}
          options={effectOptions}
        />
        <FormLabel>
          Sigils
        </FormLabel>
        <Select
          placeholder="Select one or more sigils"
          isMulti
          onChange={e => setSigils(e.map(r => r.value))}
          options={sigilOptions}
        />
        <Box marginTop="20px">
          <Checkbox
            defaultChecked
            onChange={() => setShowFullInfo(!showFullInfo)}
            isChecked={showFullInfo}
          >
            Show full info
          </Checkbox>
        </Box>
      <Table
        data={matches}
        showFullInfo={showFullInfo}
        updateSort={updateSort}
        isAsc={order === 'asc'}
        sortBy={sortBy}
      />
    </Box>
  );
};

export default Finder;
