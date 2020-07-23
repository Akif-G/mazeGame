const path = require('path')
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const AppError = require('./api/utils/AppError');
const mazeRouter = require('./api/routers/mazeRouter');
const cors = require('cors');

const app = express();

//security &http
app.use(helmet())

//limit requests
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    message: 'too many request for this ip please try again later.'
})
app.use('/api', limiter);

//body parser: reading data from body into req.body, with limit of 10kb
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

//Data sanitization against XSS
app.use(xssClean());

///////////////////////////// ROUTE //////////////////////////////////
app.use(morgan('dev'))
app.use(cors());

//API
app.use('/solve', mazeRouter);

//REACT
app.use(express.static(path.join(__dirname, 'build')));

//404
app.all('*', (req, res, next) => {
    const err = new AppError('This Page is not exist.', 404);
    next(err);
});

module.exports = app;