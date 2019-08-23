require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes')

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);
app.listen(port, () => {
  console.log(`running on ${port}`);
});

module.exports = app;