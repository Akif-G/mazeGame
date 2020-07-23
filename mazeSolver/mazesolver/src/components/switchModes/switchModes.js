import React, { useContext, useState } from 'react';
import { MazeContext } from '../../contexts/mazeContext';
import './switchModes.css';

const SwitchModes = (props) => {

    const [state, setData] = useContext(MazeContext);
    return (
        <div className="switchContainer">
            <div className={"draw".concat(state.mode === 1 ? " contrasted" : "")} onClick={() => setData({ ...state, mode: 1 })}></div>
            <div className={"delete".concat(state.mode === 2 ? " contrasted" : "")} onClick={() => setData({ ...state, mode: 2 })}></div>
            <div className={"beginPoint".concat(state.mode === 3 ? " contrasted" : "")} onClick={() => setData({ ...state, mode: 3 })}></div>
        </div>
    );
}

export default SwitchModes;



