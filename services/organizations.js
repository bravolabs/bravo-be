const organizations = require('../data/dbModels/organizations');

async function getShoutouts(id) {
  const organization = await organizations.read(id);
  if (!organization || !organization.slack_org_id) {
    return {
      statusCode: 404,
      data: {
        message: 'Organization does not exist',
      },
    };
  }
  const shoutouts = organizations.getShoutouts(organization.id);

  return {
    statusCode: 200,
    data: {
      data: shoutouts,
    },
  };
}

module.exports = {
  getShoutouts,
};
