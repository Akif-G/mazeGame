const catchAsync = require('../utils/catchAsync');
const exec = require('child_process').execFile;
const fs = require('fs');
const AppError = require('../utils/AppError');
const path = require('path');

//maze solver is compiled c++ program, code is in mazeSolverCodes.
exports.solve = catchAsync(
    async (req, res, next) => {
        const { data } = req.body;

        await fs.writeFile(`${path.join(__dirname, 'maze')}`, data, () => { })
        //Arguements will take place in ,<>, here
        await exec(`${path.join(__dirname, 'mazeSolver.exe')}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        })

        await fs.readFile(`${path.join(__dirname, 'results')}`, { encoding: 'utf8', flag: 'r' }, function (err, data) {
            if (err) {
                console.log(err);
                const error = new AppError('Could not solve the maze', 500);
                next(error);
            }
            else {
                res.status(200).json({ data: data.split("\r\n").join(" ") });
            }
        });
    }
)