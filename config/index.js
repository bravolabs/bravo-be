const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 5000;
const secret = process.env.JWT_SECRET;
const clientUrl = process.env.CLIENT_URL;
const slack = {
  slackToken: process.env.SLACK_APP_TOKEN,
  bravoChannel: process.env.BRAVO_CHANNEL,
  verificationToken: process.env.VERIFICATION_TOKEN,
  clientId: process.env.SLACK_CLIENT_ID,
  clientSecret: process.env.SLACK_CLIENT_SECRET,
  baseUrl: process.env.SLACK_BASE_URL,
  designatedChannel: process.env.DESIGNATED_CHANNEL,
  signingSecret: process.env.SLACK_SIGNING_SECRET
};

module.exports = {
  port,
  secret,
  slack,
  clientUrl,
};
