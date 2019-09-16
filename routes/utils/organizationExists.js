const organizations = require('../../data/dbModels/organizations');

module.exports = async function organizationExists(req, res, next) {
  const { team: slackWorkspace } = req.slackRes;
  const userOrg = await organizations.read(null, slackWorkspace.id);
  if (!userOrg) {
    return res.status(404).json({
      message: 'Workspace not found. Please contact your workspace admin to install Bravo',
    });
  }

  req.userOrg = userOrg;
  next();
};
