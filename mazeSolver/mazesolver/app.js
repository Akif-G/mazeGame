const path = require('path')
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const app = express()

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

//API
app.post('/solve', (req, res, next) => { res.send('solving') });

//REACT
app.use(express.static(path.join(__dirname, 'build')));

//404
app.all('*', (req, res, next) => {
    res.status(404).json({ data: 'This Page is not exist.' })
});

module.exports = app;