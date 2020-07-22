import React, { useState } from 'react';
import MazeSubmiter from './mazeSubmiter/mazeSubmiter';
import MazeCreator from './mazeCreator/mazeCreator';
// import './App.css';
import { MazeContext } from '../../contexts/mazeContext';

const Maze = (props) => {
    const [data, setData] = useState("default data");
    return (
        <div className="Maze">
            <MazeContext.Provider value={[data, setData]}>
                <MazeCreator />
                <MazeSubmiter />
            </MazeContext.Provider>
        </div>
    );
}

export default Maze;
