const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' })

const app = require('./app');

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () =>
    console.log(`Application is running on :: ${PORT}`)
);