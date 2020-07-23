import React, { useContext } from 'react';
import { MazeContext } from '../../../contexts/mazeContext';
import './mazeCreator.css';
import MazeResult from './mazeResult/mazeResult'

const MazeCreator = (props) => {

    const [state, setData] = useContext(MazeContext);

    const Draw = (e) => {
        let newData = [...state.data];
        let newBeginning = state.beginning;
        if (state.mode === 1) {
            if (!newData.includes(e.target.id)) {
                e.target.style.background = '#323334';
                newData.push(e.target.id);
                console.log("drawn")
                if (state.beginning && e.target.id === state.beginning.id) {
                    newBeginning = null;
                };
            }
        }
        if (state.mode === 2) {
            if (state.beginning && e.target.id === state.beginning.id) {
                newBeginning = null;
                e.target.style.background = '#efeeee';
            }
            newData = newData.filter(item => item !== e.target.id)
            e.target.style.background = '#efeeee';
        }
        setData({ ...state, data: newData, beginning: newBeginning })
    };

    const putBeginning = (e) => {
        if (state.mode === 3) {
            if (state.beginning) {
                state.beginning.style.background = '#efeeee';
            }
            e.target.style.background = '#5dbcd2';

            setData({ ...state, beginning: e.target });
        }
    };

    let maze = []
    for (let j = 0; j < 40; j++) {
        for (let i = 0; i < 40; i++) {
            maze.push(<div className="element" key={i + 40 * j} id={i + 40 * j} onMouseEnter={Draw} onClick={putBeginning} />)
        }
    };



    return (
        <div className="MazeCreator">
            {/* <textarea className="mazeInput" value={data} onChange={(e) => {
                setData(e.target.value)
            }} /> */}
            {state.mode === 4 ? <MazeResult /> : maze}
        </div>
    );
}

export default MazeCreator;
