import React, { useEffect, useState } from 'react';
import {
  Box,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import Select from 'react-select';
import Table from '../Table';
// import gear from '../../data/gear.js';
import { limitedData as gear } from '../../data/gear.js';
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

const Finder = () => {
  const [matches, setMatches] = useState(gear);
  const [realms, setRealms] = useState([]);
  const [slots, setSlots] = useState([]);
  const [minLevel, setMinLevel] = useState(1);
  const [maxLevel, setMaxLevel] = useState(60);
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
      
      const filterWithPredicates = (list, predicates) => {
        return list.filter(item => {
          return Object.values(predicates).every(predicate => {
            if (predicate(item)) { return true }
          })
          return false;
        });
      };

      setMatches(filterWithPredicates(gear, predicates));
  }, [realms, slots, minLevel, maxLevel]);

  return (
    <Box p="20px">
      <Text fontSize="3xl" color="teal.500">
        Find some gear
      </Text>
        <FormLabel>
          Realm
        </FormLabel>
        <Select
          placeholder="Select one or more realms (or event)"
          isMulti
          onChange={e => setRealms(e.map(r => r.value))}
          options={realmOptions}
        />
        <FormLabel>
          Slot
        </FormLabel>
        <Select
          placeholder="Select one or more slots"
          isMulti
          onChange={e => setSlots(e.map(r => r.value))}
          options={slotOptions}
        />
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
        <Box w="200px">
          <FormLabel>
            Maximum Level
          </FormLabel>
          <Select
            placeholder="Maximum Level"
            onChange={e => setMaxLevel(e.value)}
            options={maxLevelOptions}
          />
        </Box>  
      <Table data={matches} />
    </Box>
  );
};

export default Finder;
