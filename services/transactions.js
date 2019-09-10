const transactions = require('../data/dbModels/transactions');
const organizations = require('../data/dbModels/organizations');

const pageLimit = Number(process.env.TRANSACTION_PAGE_LIMIT || '50');

async function getTransactionsForOrganization(orgId) {
  const result = await transactions.read(orgId);
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

async function getFullTransactionsForOrganization(orgId) {
  const result = await transactions.readWithData(orgId);
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

module.exports = {
  getTransactionsForOrganization,
  getFullTransactionsForOrganization,
};
