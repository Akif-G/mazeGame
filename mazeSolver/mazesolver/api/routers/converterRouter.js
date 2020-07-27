const express = require('express');
const Converter = require('../controllers/converter');
const router = express.Router();

router.get('/', Converter.convert)

module.exports = router;