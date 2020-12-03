const express = require('express');
const justifyController = require('./controllers/justifyController');

const router = express.Router();

router.post('/api/justify', justifyController.justify80);

module.exports = router;