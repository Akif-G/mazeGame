import React, { Fragment } from 'react';

const MazeResult = (props) => {
    let maze = []
    for (let j = 0; j < 40; j++) {
        for (let i = 0; i < 40; i++) {
            if (props.data.includes('' + (j * 40 + i))) {
                maze.push(<div className="element" key={i + 40 * j} id={i + 40 * j} >0</div>)
            }
            else {
                maze.push(<div className="element" key={i + 40 * j} id={i + 40 * j} style={{ color: "#5dbcd2" }}>1</div>)
            }
        }
    }
    return (
        <Fragment>
            {maze}
        </Fragment>
    );
}

export default MazeResult;
