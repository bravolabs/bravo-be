const user = require('./user');
const message = require('./message');
const channel = require('./channel');

exports.slackModel = {
  user,
  message,
  channel,
};
