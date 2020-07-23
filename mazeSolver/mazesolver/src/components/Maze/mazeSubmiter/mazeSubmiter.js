import React, { useContext } from 'react';
import { MazeContext } from '../../../contexts/mazeContext';
import './mazeSubmiter.css'
import Axios from 'axios';

const MazeSubmiter = (props) => {

    const [data, setData] = useContext(MazeContext);

    const submitHandle = (e) => {
        console.log("clicked")
        // send a POST request
        Axios({
            method: 'post',
            url: 'http://localhost:8080/solve',
            data: { data: data }
        },
            { headers: { "Access-Control-Allow-Origin": "*" } }
        ).then((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }

    return (
        <div className="Maze">
            <button className="submitButton" onClick={submitHandle}>Submit</button>
        </div>
    );
}

export default MazeSubmiter;
