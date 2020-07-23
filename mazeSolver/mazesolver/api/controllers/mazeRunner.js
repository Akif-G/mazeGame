const catchAsync = require('../utils/catchAsync');
const exec = require('child_process').execFile;
const fs = require('fs');
const AppError = require('../utils/AppError');
const path = require('path');

//maze solver is compiled c++ program, code is in mazeSolverCodes; placed with server.js (beginning
exports.solve = catchAsync(
    async (req, res, next) => {
        const { data } = req.body;

        await fs.writeFile(`${path.join(process.cwd(), 'maze')}`, data, () => { })
        //Arguements will take place in ,<>, here
        exec(`${path.join(process.cwd(), 'mazeSolver.exe')}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);

            fs.readFile(`${path.join(process.cwd(), 'results')}`, { encoding: 'utf8', flag: 'r' }, function (err, data) {
                if (err) {
                    console.log(err);
                    const error = new AppError('Could not solve the maze', 500);
                    next(error);
                }
                else {
                    res.status(200).json({ data: data.split("\r\n").join(" ") });
                }
            });
        })

    }
)