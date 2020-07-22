import React, { useContext } from 'react';
import { MazeContext } from '../../../contexts/mazeContext';
// import './App.css';

const MazeCreator = (props) => {

    const [data, setData] = useContext(MazeContext);

    return (
        <div className="Maze">
            <input className="mazeInput" value={data} onChange={(e) => {
                console.log(e.target.value);
                setData(e.target.value)
            }} />
        </div>
    );
}

export default MazeCreator;
