const organizations = require('../data/dbModels/organizations');
const usersModel = require('../data/dbModels/users');

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
  const shoutouts = await organizations.getShoutouts(organization.id);

  return {
    statusCode: 200,
    data: {
      data: shoutouts,
    },
  };
}

async function getUsers(id) {
  const organization = await organizations.read(id);
  if (!organization || !organization.slack_org_id) {
    return {
      statusCode: 404,
      data: {
        message: 'Organization does not exist',
      },
    };
  }
  const users = await usersModel.read(null, organization.id);

  return {
    statusCode: 200,
    data: {
      data: users,
    },
  };
}

module.exports = {
  getShoutouts,
  getUsers,
};
