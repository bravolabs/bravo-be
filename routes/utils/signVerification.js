const crypto = require('crypto');
const qs = require('qs');
const { slack } = require('../../config');

let verifySignSecret = (req, res, next) => {
    const slackSigningSecret = slack.signingSecret;
    let slackSignature = req.headers['X-Slack-Signature'];
    let requestBody = qs.stringify(req.body, { format: 'RFC1738' });
    let timestamp = req.headers['X-Slack-Request-Timestamp'];

    const time = Math.floor(new Date().getTime() / 1000);

    if (Math.abs(time - timestamp) > 300) {
        return res.status(400).send('Ignore this request');
    }

    if (!slackSigningSecret) {
        return res.status(400).send('Slack signing secret is empty.');
    }

    
}

module.exports = {
    verifySignSecret,
}