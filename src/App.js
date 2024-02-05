import React from 'react';
import { Chakra } from './providers';
import './App.css';
import Finder from './components/Finder';

function App() {
  return (
    <Chakra>
      <div>
        <Finder />
      </div>
    </Chakra>
  );
}

export default App;
