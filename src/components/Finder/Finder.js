import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import Select from 'react-select';
import Table from '../Table';
import _ from 'lodash';
import qs from 'qs';

const levelRange = [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

const getMinLevelOptions = (max) => levelRange.filter(l => l <= max).map(l => ({ value: l, label: l }));
const getMaxLevelOptions = (min) => levelRange.filter(l => l >= min).map(l => ({ value: l, label: l }));

// const baseUrl = 'http://localhost:5000';
const baseUrl = 'https://olmran-api.vercel.app';

const Finder = () => {
  // TODO: move to reducer?
  const [matches, setMatches] = useState([]);
  const [realms, setRealms] = useState([]);
  const [slots, setSlots] = useState([]);
  const [minLevel, setMinLevel] = useState(1);
  const [maxLevel, setMaxLevel] = useState(60);
  const [effects, setEffects] = useState([]);
  const [types, setTypes] = useState([]);
  const [sigils, setSigils] = useState([]);
  const [minLevelOptions, setMinLevelOptions] = useState(getMinLevelOptions(60));
  const [maxLevelOptions, setMaxLevelOptions] = useState(getMaxLevelOptions(1));
  const [options, setOptions] = useState({});

  const [sortBy, setSortBy] = useState('realm');
  const [order, setOrder] = useState('asc');
  
  const [showFullInfo, setShowFullInfo] = useState(true);
  const [combos, setCombos] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/initialize`)
      .then(response => response.json())
      .then(response => setOptions(response))
  }, []);

  useEffect(() => {
    setMinLevelOptions(getMinLevelOptions(maxLevel));
  }, [maxLevel]);

  useEffect(() => {
    setMaxLevelOptions(getMaxLevelOptions(minLevel));
  }, [minLevel]);

  useEffect(() => {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      };
      
      // fetch('https://larson-pool-api.vercel.app/', requestOptions)
      const url = `${baseUrl}?${qs.stringify({ types, effects, sigils, minLevel, maxLevel, slots, realms, sortBy, order }, { allowEmptyArrays: true })}`;
      fetch(url, requestOptions)
        .then(response => response.json())
        .then(response => setMatches(response))

  }, [realms, slots, minLevel, maxLevel, effects, types, sigils, sortBy, order]);

  const updateSort = (col) => {
    if (col === sortBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setOrder('asc');
    }
  };

  const generateCombos = () => {
    fetch(`${baseUrl}?${qs.stringify({ types, effects, sigils, minLevel, maxLevel, slots, realms, combos: true })}`)
      .then(response => response.json())
      .then(response => setCombos(response))
  }

  return (
    <Box p="20px">
      <Text fontSize="3xl" color="teal.500">
        Find some gear
      </Text>
      <Box m="50px" maxWidth="500px">
        <Text fontSize="xl" color="teal.500">
          Notes:
        </Text>
        <Text fontSize="lg">
          I added table sorting but everything is happening client side so it's super slow.  Gonna move this stuff to an
          API soon.
        </Text>
        <Text fontSize="lg" marginTop="10px">
          In order to generate all possible gear options, choose exactly 8 effects, your desired types, and 'Other'.  To speed up and narrow down
          also set the realms and min/max levels to a smaller (or single) range.
          Then click "Generate" and be patient.  Let me know if anything looks wonky.
        </Text>
      </Box>
      <FormLabel>
        Realms
      </FormLabel>
      <Select
        style={{ maxWidth: "900px" }}
        placeholder="Select one or more realms (or event)"
        isMulti
        onChange={e => setRealms(e.map(r => r.value))}
        options={options.realmOptions}
      />
      <FormLabel>
        Slots
      </FormLabel>
      <Select
        style={{ maxWidth: "900px" }}
        placeholder="Select one or more slots"
        isMulti
        onChange={e => setSlots(e.map(r => r.value))}
        options={options.slotOptions}
      />
      <FormLabel>
        Types
      </FormLabel>
      <Select
        style={{ maxWidth: "900px" }}
        placeholder="Select one or more types"
        isMulti
        onChange={e => setTypes(e.map(r => r.value))}
        options={options.typeOptions}
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
        options={options.effectOptions}
      />
      <FormLabel>
        Sigils
      </FormLabel>
      <Select
        placeholder="Select one or more sigils"
        isMulti
        onChange={e => setSigils(e.map(r => r.value))}
        options={options.sigilOptions}
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
      {effects.length === 8 && <Button m="20px" onClick={generateCombos}>Generate</Button>}
      <Table
        data={matches}
        showFullInfo={showFullInfo}
        updateSort={updateSort}
        isAsc={order === 'asc'}
        sortBy={sortBy}
      />
      {combos.length > 0 && (
        combos.map((combo, i) => (
          <Table
            key={i}
            data={combo}
            showFullInfo={showFullInfo}
            updateSort={updateSort}
            isAsc={order === 'asc'}
            sortBy={sortBy}
          />
      )))}
    </Box>
  );
};

export default Finder;
