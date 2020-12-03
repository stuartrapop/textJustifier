require('dotenv').config(); // used for .env file.
const express = require('express');

const app = express();

const port = process.env.PORT;

const bodyParser = require('body-parser');

app.use(bodyParser.json());

// for handling post encoded data
app.use(express.urlencoded({ extended: true }));

// create a staic directory for serving page with instructions for using the API
app.use(express.static('./public'));

// add router
const router = require('./app/router');

app.use(router);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
