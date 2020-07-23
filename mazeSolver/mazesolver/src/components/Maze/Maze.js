import React from 'react';
import MazeSubmiter from './mazeSubmiter/mazeSubmiter';
import MazeCreator from './mazeCreator/mazeCreator';

const Maze = (props) => {
    return (
        <div className="Maze">
            <MazeCreator />
            <MazeSubmiter />
        </div>
    );
}

export default Maze;
