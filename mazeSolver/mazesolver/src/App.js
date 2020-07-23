import React, { useState } from 'react';
import './App.css';
import Maze from './components/Maze/Maze'
import { MazeContext } from './contexts/mazeContext';
import SwitchModes from './components/switchModes/switchModes';

function App() {
  const [data, setData] = useState({ data: new Array(), mode: 1, beginning: null });
  return (
    <MazeContext.Provider value={[data, setData]}>
      <div className="App">
        <Maze />
        <SwitchModes />
      </div>
    </MazeContext.Provider>
  );
}

export default App;