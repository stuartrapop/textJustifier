const jwt = require('jsonwebtoken');

const client = require('../database');

const tokenMiddleware = {
  // pass if valid jwt
  checkValidToken: (req, res, next) => {
    const { token } = req.query;
    jwt.verify(token, process.env.TOKENSECRET, (err, decoded) => {
      if (!err) {
        next();
      } else {
        res.status(403).send({ error: 'your token is not valid, please generate a new one' });
      }
    });
  },
  // check if sufficient credit. Updated words_justified value in token table if available credit
  // otherwise send message
  tokentUpdateAndCheck: async (req, res, next) => {
    try {
      const { token } = req.query;
      const receivedText = req.body.text;
      const numWords = receivedText.split(' ').length;
      const selectQuery = 'SELECT * FROM token WHERE token =  $1';
      const selectResponse = await client.query(selectQuery, [`${token}`]);

      if (!selectResponse.rows[0]) {
        throw Error;
      } else if ((selectResponse.rows[0].words_justified + numWords) > 80000) {
        res.status(402).send({
          message: 'Payment Required - we want bitcoins',
        });
      } else {
        const updateQuery = `UPDATE token SET words_justified = ${selectResponse.rows[0].words_justified + numWords} WHERE token =  $1`;
        const updateResponse = await client.query(updateQuery, [`${token}`]);

        // for initial debugging
        /*   res.send({
          selectResponse: selectResponse.rows[0],
          selectQuery,
          updateResponse: updateResponse.rows[0],
          updateQuery,
          numWords,
        }); */

        next();
      }
    } catch (error) {
      res.status(500).send({
        message: 'error in tokenUpdateAndCheck',
      });
    }
  },

};

module.exports = tokenMiddleware;
