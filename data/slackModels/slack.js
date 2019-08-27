const axios = require('axios');
const qs = require('qs');
const { slack, } = require('../../config');
const user = require('./user');
const message = require('./message');
const channel = require('./channel');

exports.slackModel = {
  user,
  message,
  channel,
};
