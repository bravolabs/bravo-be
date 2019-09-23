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
  const shoutouts = await organizations.getShoutouts(id, limit + 1, offset);
  const nextPage = (limit < shoutouts.length && next) || null;
  shoutouts.splice(limit, 1);
  return {
    statusCode: 200,
    data: {
      previousPage: previous,
      nextPage,
      data: shoutouts,
    },
  };
}

async function getUsers(id, paginateInfo) {
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
  const users = await usersModel.readUsersByOrganization(id, limit + 1, offset);
  const nextPage = (limit < users.length && next) || null;
  users.splice(limit, 1);

  return {
    statusCode: 200,
    data: {
      previousPage: previous,
      nextPage,
      data: users,
    },
  };
}

module.exports = {
  getShoutouts,
  getUsers,
};
