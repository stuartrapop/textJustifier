const jwt = require('jsonwebtoken');

const client = require('../database');

const tokenController = {

  /* create a unique token which lasts for 24 hours
  from doc jwt.sign takes ass paramenters : payload, secretOrPrivateKey, [options]
*/
  createUniqueToken: async (req, res) => {
    try {
      const { emailJson } = req.body;
      const emailObject = JSON.parse(emailJson);
      const token = jwt.sign(emailObject, process.env.TOKENSECRET, { expiresIn: 60 * 60 * 24 });
      const query = 'INSERT INTO token (token) VALUES ($1)';
      const response = await client.query(query, [`${token}`]);
      // console.log('sql response', response);
      res.send(token);
    } catch (error) {
      res.status(500).send({
        message: 'error in createUniqueToken',
      });
    }
  },

};

module.exports = tokenController;
