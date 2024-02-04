import React from 'react';
import { TableContainer, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const style = {
  border: '1px solid black',
  padding: '5px',
};

const Main = ({ data }) => (
  <TableContainer>
    <Table variant='simple' style={{ borderCollapse: 'collapse' }}>
      {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
      <Thead>
        <Tr>
          <Th style={style}>Realm</Th>
          <Th style={style}>Area</Th>
          <Th style={style}>Mob</Th>
          <Th style={style}>Item</Th>
          <Th style={style}>Slot</Th>
          <Th style={style}>Type</Th>
          <Th style={style}>Spell</Th>
          <Th style={style}>Level</Th>
          <Th style={style}>Damage</Th>
          <Th style={style}>Timer</Th>
          <Th style={style}>Fumble</Th>
          <Th style={style}>Accuracy</Th>
          <Th style={style}>Defense</Th>
          <Th style={style}>Sigil</Th>
          <Th style={style}>SigilLvl</Th>
          <Th style={style}>Weight</Th>
          <Th style={style}>Notes</Th>
          <Th style={style}>Last Updated</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((item, idx) => (
          <Tr key={`${item.item}-${idx}`}>
            <Td style={style}>{item.realm}</Td>
            <Td style={style}>{item.area}</Td>
            <Td style={style}>{item.mob}</Td>
            <Td style={style}>{item.item}</Td>
            <Td style={style}>{item.slot}</Td>
            <Td style={style}>{item.type}</Td>
            <Td style={style}>{item.spell}</Td>
            <Td style={style}>{item.level}</Td>
            <Td style={style}>{item.damage}</Td>
            <Td style={style}>{item.timer}</Td>
            <Td style={style}>{item.fumble}</Td>
            <Td style={style}>{item.accuracy}</Td>
            <Td style={style}>{item.defense}</Td>
            <Td style={style}>{item.sigil}</Td>
            <Td style={style}>{item.sigilLvl}</Td>
            <Td style={style}>{item.weight}</Td>
            <Td style={style}>{item.notes}</Td>
            <Td style={style}>{item.lastUpdated}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);

export default Main;