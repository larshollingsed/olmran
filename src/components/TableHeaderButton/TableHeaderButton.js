import React from 'react';
import { Button } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import _ from 'lodash';

const TableHeaderButton = ({ updateSort, isAsc, sortBy, value, header }) => (
  <Button
    w="100%"
    onClick={() => updateSort(value)}
    rightIcon={sortBy === value ? (isAsc ? <ChevronDownIcon /> : <ChevronUpIcon />) : null}
  >
    {header || _.capitalize(value)}
  </Button>
);

export default TableHeaderButton;
