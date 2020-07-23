import React, { useContext } from 'react';
import { MazeContext } from '../../../contexts/mazeContext';
import './mazeCreator.css';

const MazeCreator = (props) => {

    const [data, setData] = useContext(MazeContext);

    return (
        <div className="Maze">
            <textarea className="mazeInput" value={data} onChange={(e) => {
                setData(e.target.value)
            }} />
        </div>
    );
}

export default MazeCreator;
