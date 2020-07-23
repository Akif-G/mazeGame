import React, { Fragment, useEffect, useContext, useState, useRef } from 'react';
import { MazeContext } from '../../../../contexts/mazeContext';

const MazeResult = () => {
    const [data, setData] = useContext(MazeContext);
    const [state, setState] = useState({ maze: new Array() })

    const willMount = useRef(true);

    if (willMount.current) {
        let newMaze = [...state.maze];
        for (let j = 0; j < 40; j++) {
            for (let i = 0; i < 40; i++) {
                if (data.data.includes('' + (j * 40 + i))) {
                    newMaze.push(<div className="element" key={i + 40 * j} id={i + 40 * j} style={{ backgroundColor: "#323334", color: "#efe" }} ></div>)
                }
                else {
                    newMaze.push(<div className="element" key={i + 40 * j} id={i + 40 * j} style={{ color: "#5dbcd2" }}></div>)
                }
            }
        }
        setState({ ...state, maze: newMaze })
    }
    willMount.current = false;

    useEffect(() => {
        if (data.response) {
            let newMaze = [...state.maze];
            let a = 0;
            for (const id of data.response) {
                a++;
                setTimeout(() => {
                    newMaze[id] = < div className="element" key={id} style={{ backgroundColor: "#5dbcd2" }}></div >
                    setState({ ...state, maze: newMaze })
                }, 10 * a)
            }
        }
    }, [data.response]);

    return (
        <Fragment>
            {state.maze}
        </Fragment>
    );
}

export default MazeResult;
