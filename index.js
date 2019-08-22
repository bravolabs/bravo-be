require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const bot = require('./bot');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/bot', bot);
app.listen(port, () => {
  console.log(`running on ${port}`);
});