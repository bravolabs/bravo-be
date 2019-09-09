const users = require('../../data/dbModels/users');

module.exports = async function userExists(req, res, next) {
  const { body, slackRes, userOrg } = req;
  let user = await users.readBySlackId(body.userId);

  if (!user) {
    user = await users.create({
      name: slackRes.user.name,
      slack_mem_id: slackRes.user.id,
      email: slackRes.user.email,
      avatar: slackRes.user.image_512,
      org_id: userOrg.id,
    });
  }

  req.user = user;
  next();
};
