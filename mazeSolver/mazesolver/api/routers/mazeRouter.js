const express = require('express');
const mazeRunner = require('../controllers/mazeRunner');
const router = express.Router();

router.post('/', mazeRunner.solve)

module.exports = router;
