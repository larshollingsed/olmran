import React, { useEffect, useState } from 'react';
import { Box, FormLabel, HStack, Text } from '@chakra-ui/react';
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
      <HStack>
        <Box>
          <FormLabel>
            Realm
          </FormLabel>
          <Select
            placeholder="Select one or more realms (or event)"
            isMulti
            onChange={e => setRealms(e.map(r => r.value))}
            options={realmOptions}
          />
        </Box>
        <Box>
          <FormLabel>
            Slot
          </FormLabel>
          <Select
            placeholder="Select one or more slots"
            isMulti
            onChange={e => setSlots(e.map(r => r.value))}
            options={slotOptions}
          />
        </Box>
        <Box>
          <FormLabel>
            Level
          </FormLabel>
          <Select
            placeholder="Select one or more levels"
            isMulti
            onChange={e => setLevels(e.map(r => r.value))}
            options={levelOptions}
          />
        </Box>
        </HStack>
      <Table data={matches} />
    </Box>
  );
};

export default Finder;
