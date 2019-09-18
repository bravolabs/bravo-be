const organizations = require('../data/dbModels/organizations');
const usersModel = require('../data/dbModels/users');

async function getShoutouts(id, paginateInfo) {
  const organization = await organizations.read(null, id);
  if (!organization || !organization.slack_org_id) {
    return {
      statusCode: 404,
      data: {
        message: 'Organization does not exist',
      },
    };
  }
  const { limit, offset, previous, next } = paginateInfo;
  const shoutouts = await organizations.getShoutouts(id, limit, offset);
  const nextPage = limit === shoutouts.length && next;
  return {
    statusCode: 200,
    data: {
      previousPage: previous,
      nextPage,
      data: shoutouts,
    },
  };
}

async function getUsers(id) {
  const organization = await organizations.read(null, id);
  if (!organization || !organization.slack_org_id) {
    return {
      statusCode: 404,
      data: {
        message: 'Organization does not exist',
      },
    };
  }
  const users = await usersModel.readUsersByOrganization(id);

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
