const express = require('express');
const justifyController = require('./controllers/justifyController');
const tokenController = require('./controllers/tokenController');
const tokenMiddleware = require('./middleware/tokenMiddleware');

const router = express.Router();

router.post('/api/justify', tokenMiddleware.checkValidToken, tokenMiddleware.tokentUpdateAndCheck, justifyController.justify80);
router.post('/api/token', tokenController.createUniqueToken);

module.exports = router;
