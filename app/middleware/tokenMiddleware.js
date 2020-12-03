const jwt = require('jsonwebtoken');

const client = require('../database');

const tokenMiddleware = {

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

  tokentUpdateAndCheck: async (req, res, next) => {
    try {
      const { token } = req.query;
      const receivedText = req.body.text;
      const numWords = receivedText.split(' ').length;
      const selectQuery = `SELECT * FROM token WHERE token =  '${token}'`;
      const selectResponse = await client.query(selectQuery);

      if (!selectResponse.rows[0]) {
        throw Error;
      } else if ((selectResponse.rows[0].words_justified + numWords) > 4000) {
        res.status(402).send({
          message: 'Payment Required - we want bitcoins',
        });
      } else {
        const updateQuery = `UPDATE token SET words_justified = ${selectResponse.rows[0].words_justified + numWords} `;
        const updateResponse = await client.query(updateQuery);

        // for testing
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
