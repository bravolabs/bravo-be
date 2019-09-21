const crypto = require('crypto');
const qs = require('qs');
const { slack } = require('../../config');

let verifySignSecret = (req, res, next) => {
    const slackSigningSecret = slack.signingSecret;
    let slackSignature = req.headers['X-Slack-Signature'];
    let requestBody = qs.stringify(req.body, { format: 'RFC1738' });
    
}

module.exports = {
    verifySignSecret,
}