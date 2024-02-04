import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import './App.css';
import Finder from './components/Finder';

function App() {
  return (
    <ChakraProvider>
      <div>
        <Finder />
      </div>
    </ChakraProvider>
  );
}

export default App;
