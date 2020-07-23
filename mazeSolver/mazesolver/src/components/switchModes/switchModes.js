import React, { useContext, useState } from 'react';
import { MazeContext } from '../../contexts/mazeContext';
import './switchModes.css';

const SwitchModes = (props) => {
    const [state, setData] = useContext(MazeContext);

    const clickHandler = (newMode) => {
        let newData = { ...state }
        if (state.response) {
            newData = { data: new Array(), mode: 1, beginning: null, response: null };
        }
        setData({ ...newData, mode: newMode })
    }

    return (
        <div className="switchContainer">
            <div className={"draw".concat(state.mode === 1 ? " contrasted" : "")} onClick={() => clickHandler(1)}></div>
            <div className={"delete".concat(state.mode === 2 ? " contrasted" : "")} onClick={() => clickHandler(2)}></div>
            <div className={"beginPoint".concat(state.mode === 3 ? " contrasted" : "")} onClick={() => clickHandler(3)}></div>
            {/* mode4=submit */}
        </div>
    );
}

export default SwitchModes;



