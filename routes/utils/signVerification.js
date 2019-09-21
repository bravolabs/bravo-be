const crypto = require('crypto');
const qs = require('qs');
const { slack } = require('../../config');

let verifySignSecret = (req, res, next) => {
    const slackSigningSecret = slack.signingSecret;
}

module.exports = {
    verifySignSecret,
}