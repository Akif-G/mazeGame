import React, { useContext } from 'react';
import { MazeContext } from '../../../contexts/mazeContext';
import './mazeSubmiter.css'
import Axios from 'axios';

const MazeSubmiter = (props) => {

    const [data, setData] = useContext(MazeContext);

    const submitHandle = (e) => {
        if (data.beginning) {
            setData({ ...data, mode: 4 })
            //handle the raw data
            const finalData = DataProcessor(data);

            // send a POST request
            Axios({
                method: 'post',
                url: 'http://localhost:8080/solve',
                data: { data: finalData }
            },
                { headers: { "Access-Control-Allow-Origin": "*" } }
            ).then((res) => {
                let response = res.data.data;
                response = response.split(' ').slice(1, -1).map(el => el.split(',')).map(el => (el[0] * 40 + parseInt(el[1], 10)))
                setData({ ...data, mode: 4, response: response })
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

    // useEffect(() => {
    //     drawARoad(state.response);
    //     return () => setData({ ...state, response: null });
    // }, [state.response]);

    // const drawARoad = (response, results) => {
    //     if (response) {
    //         response =;
    //     }
    // }

    return (
        <div className="mazeSubmit">
            <div className="submitButton" onClick={submitHandle}>
                Submit
            </div>
        </div>
    );
}

export default MazeSubmiter;
