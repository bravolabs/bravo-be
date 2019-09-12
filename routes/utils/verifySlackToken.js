const axios = require('axios');
const { slack } = require('../../config');

module.exports = async function verifySlackToken(req, res, next) {
  const { accessToken } = req.body;
  const { data: slackRes } = await axios.get(
    `${slack.baseUrl}/users.identity?token=${accessToken}`
  );

  if ('error' in slackRes) {
    return res.status(400).json({
      message: slackRes.error,
    });
  }

  req.slackRes = slackRes;
  next();
};
