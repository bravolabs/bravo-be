const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  slack: {
    slackToken: process.env.SLACK_APP_TOKEN,
    bravoChannel: process.env.BRAVO_CHANNEL,
    verificationToken: process.env.VERIFICATION_TOKEN,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    baseUrl: process.env.SLACK_BASE_URL,
    designatedChannel: process.env.DESIGNATED_CHANNEL,
  },
};
