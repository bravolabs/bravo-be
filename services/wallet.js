const transactions = require('../data/dbModels/transactions');
const actions = require('../data/dbModels/actions');
const wallets = require('../data/dbModels/wallets');

const pageLimit = Number(process.env.LEADERBOARD_PAGE_LIMIT || '50');

const clamp = (num, min, max) => {
  return Math.min(Math.max(num, min), max);
};

async function getUserWallet(userId) {
  let result = await wallets.readByUserId(userId);
  if (!result) {
    result = await wallets.create({ user_id: userId });
    if (!result)
      return {
        statusCode: 404,
        data: {
          message: 'No wallet found for user',
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

async function getLeaderboardForOrganization(orgId, page = 1, pageSize = pageLimit) {
  // Make sure page is 1 or heigher
  page = Math.max(Number(page), 1);
  // Clamp size between 1 and size limit to prevent crashes
  let size = clamp(Number(pageSize), 1, pageLimit);
  const offset = (page - 1) * size;
  const result = await wallets.getWalletLeaderboard(orgId, offset, limit + 1);
  if (!result) {
    return {
      statusCode: 404,
      data: {
        message: 'No wallets found for organization',
      },
    };
  }
  const nextPage = (limit < result.length && next) || null;
  result.splice(limit, 1);
  return {
    statusCode: 200,
    data: {
      previousPage: previous,
      nextPage,
      data: result,
    },
  };
}

async function ProcessTransaction(userId, giverId, orgId, shoutoutId, actionNameOrId, gained) {
  // we need to handle the edge case of someone giving a reaction and removing it
  // and also how many times can one react
  try {
    let action;
    // Convert action name or id to action
    if (typeof actionNameOrId === 'string') {
      action = await actions.readByName(actionNameOrId);
    } else {
      action = await actions.readById(actionNameOrId);
    }
    if (!action) throw new Error('action invalid');

    let userWallet = await wallets.readByUserId(userId);
    //Create user wallet if it doesn't exist
    if (!userWallet) {
      userWallet = await wallets.create({
        user_id: userId,
      });
    }
    // Something went very wrong if we still don't have a wallet
    if (!userWallet) throw new Error('Error getting user wallet');

    // Update user wallet with new amount
    let newAmount;
    if (gained) {
      newAmount = userWallet.amount + action.reward;
    } else {
      newAmount = userWallet.amount - action.reward;
    }
    const updatedWallet = await wallets.updateByUserId(userId, newAmount);

    const transaction = await transactions.create({
      org_id: orgId,
      giver_id: giverId,
      receiver_id: userId,
      action_id: action.id,
      shoutout_id: shoutoutId,
    });

    if (!transaction) throw new Error("transaction couldn't be created");

    // Return both transaction and updated user wallet
    return {
      transaction,
      wallet: updatedWallet,
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  ProcessTransaction,
  getLeaderboardForOrganization,
  getUserWallet,
};
