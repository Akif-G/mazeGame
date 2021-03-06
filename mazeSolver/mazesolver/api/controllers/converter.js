const { spawn } = require('child_process');

exports.convert = (req, res) => {

    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['./pixelToBinary.py', 'paddington.png']);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log("data")
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    python.stderr.on('data', function (data) {
        console.log(data)
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend)
    });

}