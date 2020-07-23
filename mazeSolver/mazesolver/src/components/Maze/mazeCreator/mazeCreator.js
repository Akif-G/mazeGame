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
            e.target.style.background = '#323334';
            newData.push(e.target.id);
            if (state.beginning && e.target.id === state.beginning.id) {
                newBeginning = null;
            };
        }
        else if (state.mode === 2) {
            if (state.beginning && e.target.id === state.beginning.id) {
                newBeginning = null;
            }

            const index = newData.indexOf(e.target.id);
            if (index > -1) {
                newData.splice(index, 1);
            }
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

    // useEffect(() => {
    //     effect
    //     return () => {
    //         cleanup
    //     }
    // }, [input])

    return (
        <div className="MazeCreator">
            {/* <textarea className="mazeInput" value={data} onChange={(e) => {
                setData(e.target.value)
            }} /> */}
            {state.mode === "submit" ? <MazeResult {...state} /> : maze}
        </div>
    );
}

export default MazeCreator;
