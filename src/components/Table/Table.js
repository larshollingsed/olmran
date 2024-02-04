import React from 'react';
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const Main = ({ data }) => (
  <TableContainer>
    <Table variant='simple'>
      {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
      <Thead>
        <Tr>
          <Th>Realm</Th>
          <Th>Area</Th>
          <Th>Mob</Th>
          <Th>Item</Th>
          <Th>Slot</Th>
          <Th>Type</Th>
          <Th>Spell</Th>
          <Th>Level</Th>
          <Th>Damage</Th>
          <Th>Timer</Th>
          <Th>Fumble</Th>
          <Th>Accuracy</Th>
          <Th>Defense</Th>
          <Th>Sigil</Th>
          <Th>SigilLvl</Th>
          <Th>Weight</Th>
          <Th>Notes</Th>
          <Th>Last Updated</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, idx) => (
          <Tr key={`${item.item}-${idx}`}>
            <Td>{item.realm}</Td>
            <Td>{item.area}</Td>
            <Td>{item.mob}</Td>
            <Td>{item.item}</Td>
            <Td>{item.slot}</Td>
            <Td>{item.type}</Td>
            <Td>{item.spell}</Td>
            <Td>{item.level}</Td>
            <Td>{item.damage}</Td>
            <Td>{item.timer}</Td>
            <Td>{item.fumble}</Td>
            <Td>{item.accuracy}</Td>
            <Td>{item.defense}</Td>
            <Td>{item.sigil}</Td>
            <Td>{item.sigilLvl}</Td>
            <Td>{item.weight}</Td>
            <Td>{item.notes}</Td>
            <Td>{item.lastUpdated}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);

export default Main;