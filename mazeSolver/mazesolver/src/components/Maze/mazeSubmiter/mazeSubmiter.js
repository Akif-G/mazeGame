import React, { useContext } from 'react';
import { MazeContext } from '../../../contexts/mazeContext';
import './mazeSubmiter.css'
import Axios from 'axios';

const MazeSubmiter = (props) => {

    const [data, setData] = useContext(MazeContext);

    const submitHandle = (e) => {
        if (data.beginning) {
            setData({ ...data, mode: "submit" })
            //handle the raw data
            const finalData = DataProcessor(data);

            // send a POST request
            Axios({
                method: 'post',
                url: 'http://localhost:8080/solve',
                data: { data: finalData }
            },
                { headers: { "Access-Control-Allow-Origin": "*" } }
            ).then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            });
        }
        else {
            alert("choose beginning point")
        }
    };

    const DataProcessor = (data) => {
        let finalized = "40 40\n" + Math.floor(data.beginning.id % 40) + " " + Math.floor(data.beginning.id / 40) + "\n";
        console.log(data)
        for (let j = 0; j < 40; j++) {
            for (let i = 0; i < 40; i++) {
                if (data.data.includes('' + (j * 40 + i)) || (j * 40 + i) === data.beginning.id) {
                    finalized = finalized.concat("0 ");
                }
                else {
                    finalized = finalized.concat("1 ");
                }
            }
            finalized += "\n";
        };
        console.log(finalized)
        return finalized;
    };

    return (
        <div className="mazeSubmit">
            <div className="submitButton" onClick={submitHandle}>
                <button className="miniArea" >Submit</button>
            </div>
        </div>
    );
}

export default MazeSubmiter;
