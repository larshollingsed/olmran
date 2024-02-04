import React, { useEffect, useState } from 'react';
import { Box, FormLabel, Text } from '@chakra-ui/react';
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

  const asdf = opts;
  debugger

  return opts.sort((a, b) => a - b);
};

const Finder = () => {
  const [matches, setMatches] = useState(gear);
  const [realms, setRealms] = useState([]);
  const [slots, setSlots] = useState([]);
  const [levels, setLevels] = useState([]);
  const [realmOptions, setRealmOptions] = useState([]);
  const [slotOptions, setSlotOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);

  useEffect(() => {
    setRealmOptions(getUniqueOptions(gear, 'realm'));
  }, []);

  useEffect(() => {
    setSlotOptions(getUniqueOptions(gear, 'slot'));
  }, []);

  useEffect(() => {
    setLevelOptions(getUniqueOptions(gear, 'level'));
  }, []);

  useEffect(() => {
    let workingMatches = gear;

    if (realms.length > 0) {
      workingMatches  = workingMatches.filter((item) => realms.includes(item.realm));
    }

    if (slots.length > 0) {
      workingMatches  = workingMatches.filter((item) => slots.includes(item.slot));
    }

    if (levels.length > 0) {
      workingMatches  = workingMatches.filter((item) => levels.includes(item.level));
    }

    setMatches(workingMatches);
  }, [realms, slots, levels]);

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
        placeholder="Select one or slots"
        isMulti
        onChange={e => setSlots(e.map(r => r.value))}
        options={slotOptions}
      />
      <FormLabel>
        Level
      </FormLabel>
      <Select
        placeholder="Select one or levels"
        isMulti
        onChange={e => setLevels(e.map(r => r.value))}
        options={levelOptions}
      />
      <Table data={matches} />
    </Box>
  );
};

export default Finder;
