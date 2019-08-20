import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
config();

import bot from './bot';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/bot', bot);
app.listen(port, () => {
  console.log(`running on ${port}`);
});