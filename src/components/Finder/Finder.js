import React, { useEffect, useState } from 'react';
import { FormLabel, Text } from '@chakra-ui/react';
import Select from 'react-select';
import Table from '../Table';
import gear from '../../data/gear.js';

var resArr = [];
gear.filter(function(item){
  var i = resArr.findIndex(x => (x.item == item.item));
  if(i <= -1){
        resArr.push(item);
  }
  return null;
});
console.log(resArr)

const realmOptions = [
  { value: 'Chaos', label: 'Chaos' },
  { value: 'Evil', label: 'Evil' },
  { value: 'Good', label: 'Good' },
  { value: 'Kaid Red', label: 'Kaid Red' },
  { value: 'Kaid Green', label: 'Kaid Green' },
  { value: 'Kaid Purple', label: 'Kaid Purple' },
  { value: 'Event', label: 'Event' },
]

const Finder = () => {
  const [matches, setMatches] = useState(gear);
  const [realms, setRealms] = useState([]);

  useEffect(() => {
    if (realms.length === 0) {
      setMatches(gear);
    } else {
      const filtered = gear.filter((item) => realms.includes(item.realm));
      setMatches(filtered);
    }
  }, [realms]);

  return (
    <div>
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
      <Table data={matches} />
    </div>
  );
};

export default Finder;
