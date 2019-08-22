require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const bot = require('./bot');
const shoutouts = require('./routes/shoutouts');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/bot', bot);
app.use('/api/shoutouts', shoutouts)

app.listen(port, () => {
  console.log(`running on ${port}`);
});

module.exports = app;