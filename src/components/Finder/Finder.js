import React, { useEffect, useState } from 'react';
import {
  Box,
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
    if (!item[key]) return { value: '', label: 'Other' };
    return { value: item[key], label: item[key] };
  });

  return _.sortBy(opts, o => o.value );
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

      if (realms.length > 0) {
        predicates.realm = (record) => realms.includes(record.realm);
      }

      if (slots.length > 0) {
        predicates.slot = (record) => slots.includes(record.slot);
      }

      if (effects.length > 0) {
        predicates.spell = (record) => effects.includes(record.spell);
      }

      if (types.length > 0) {
        predicates.type = (record) => types.includes(record.type);
      }

      if (sigils.length > 0) {
        predicates.sigil = (record) => sigils.includes(record.sigil);
      }

      setMatches(filterWithPredicates(gear, predicates));
  }, [realms, slots, minLevel, maxLevel, effects, types, sigils]);

  return (
    <Box p="20px">
      <Text fontSize="3xl" color="teal.500">
        Find some gear
      </Text>
        <FormLabel>
          Realm
        </FormLabel>
        <Select
          style={{ maxWidth: "900px" }}
          placeholder="Select one or more realms (or event)"
          isMulti
          onChange={e => setRealms(e.map(r => r.value))}
          options={realmOptions}
        />
        <FormLabel>
          Slot
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
      <Table data={matches} />
    </Box>
  );
};

export default Finder;
