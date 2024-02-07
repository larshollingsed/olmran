import React from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import TableHeaderButton from '../TableHeaderButton';

const style = {
  border: '1px solid black',
  padding: '5px',
  textWrap: 'wrap',
};

const Main = ({ data, showFullInfo, updateSort, isAsc, sortBy }) => (
  <TableContainer marginTop="20px">
    <Table variant='simple' style={{ borderCollapse: 'collapse' }}>
      <Thead>
        <Tr>
          <Th style={style}>
            <TableHeaderButton updateSort={updateSort} isAsc={isAsc} sortBy={sortBy} value="realm" />
          </Th>
          <Th style={style}>
            <TableHeaderButton updateSort={updateSort} isAsc={isAsc} sortBy={sortBy} value="area" />
          </Th>
          <Th style={style}>Mob</Th>
          <Th style={style}>
            <TableHeaderButton updateSort={updateSort} isAsc={isAsc} sortBy={sortBy} value="item" />
          </Th>
          <Th style={style}>
            <TableHeaderButton updateSort={updateSort} isAsc={isAsc} sortBy={sortBy} value="slot" />
          </Th>
          <Th style={style}>
            <TableHeaderButton updateSort={updateSort} isAsc={isAsc} sortBy={sortBy} value="type" />
          </Th>
          <Th style={style}>
            <TableHeaderButton updateSort={updateSort} isAsc={isAsc} sortBy={sortBy} value="spell" header="Effect" />
          </Th>
          <Th style={style}>
            <TableHeaderButton updateSort={updateSort} isAsc={isAsc} sortBy={sortBy} value="level" />
          </Th>
          {showFullInfo && (<Th style={style}>Damage</Th> )}
          {showFullInfo && (<Th style={style}>Timer</Th> )}
          {showFullInfo && (<Th style={style}>Fumble</Th> )}
          {showFullInfo && (<Th style={style}>Accuracy</Th> )}
          {showFullInfo && (<Th style={style}>Defense</Th> )}
          <Th style={style}>
            <TableHeaderButton updateSort={updateSort} isAsc={isAsc} sortBy={sortBy} value="sigil" />
          </Th>
          <Th style={style}>SigilLvl</Th>
          {showFullInfo && (<Th style={style}>Weight</Th>)}
          {showFullInfo && (<Th style={style}>Notes</Th>)}
          {showFullInfo && (<Th style={style}>Last Updated</Th>)}
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
            {showFullInfo && (<Td style={style}>{item.damage}</Td>)}
            {showFullInfo && (<Td style={style}>{item.timer}</Td>)}
            {showFullInfo && (<Td style={style}>{item.fumble}</Td>)}
            {showFullInfo && (<Td style={style}>{item.accuracy}</Td>)}
            {showFullInfo && (<Td style={style}>{item.defense}</Td>)}
            <Td style={style}>{item.sigil}</Td>
            <Td style={style}>{item.sigilLvl}</Td>
            {showFullInfo && (<Td style={style}>{item.weight}</Td>)}
            {showFullInfo && (<Td style={style}>{item.notes}</Td>)}
            {showFullInfo && (<Td style={style}>{item.lastUpdated}</Td>)}
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);

export default Main;