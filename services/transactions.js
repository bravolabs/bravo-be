const transactions = require('../data/dbModels/transactions');
const organizations = require('../data/dbModels/organizations');

const pageLimit = Number(process.env.TRANSACTION_PAGE_LIMIT || '50');

const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};

async function getTransactionsForOrganization(orgId, page = 1, pageSize = pageLimit) {
  let size = clamp(pageSize, 1, pageLimit);
  const offset = (page - 1) * size;
  const result = await transactions.read(orgId, offset, size);
  if (!result) {
    return {
      statusCode: 404,
      data: {
        message: 'No transactions found for organization',
      },
    };
  }
  return {
    statusCode: 200,
    data: {
      data: result,
    },
  };
}

async function getFullTransactionsForOrganization(orgId, page = 1, pageSize = pageLimit) {
  let size = clamp(pageSize, 1, pageLimit);
  const offset = (page - 1) * size;
  const result = await transactions.readWithData(orgId, offset, size);
  if (!result) {
    return {
      statusCode: 404,
      data: {
        message: 'No transactions found for organization',
      },
    };
  }
  return {
    statusCode: 200,
    data: {
      data: result,
    },
  };
}

async function getTransactionsForUser(userId, page = 1, pageSize = pageLimit) {
  let size = clamp(pageSize, 1, pageLimit);
  const offset = (page - 1) * size;
  const result = await transactions.readByUser(userId, offset, size);
  if (!result) {
    return {
      statusCode: 404,
      data: {
        message: 'No transactions found for user',
      },
    };
  }
  return {
    statusCode: 200,
    data: {
      data: result,
    },
  };
}

module.exports = {
  getTransactionsForOrganization,
  getFullTransactionsForOrganization,
  getTransactionsForUser,
};
