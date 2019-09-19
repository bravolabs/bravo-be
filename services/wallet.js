const { slackModel } = require('../data/slackModels/slack');
const slackComponent = require('../data/slackComponents');
const transactions = require('../data/dbModels/transactions');
const actions = require('../data/dbModels/actions');
const wallets = require('../data/dbModels/wallets');
const { clientUrl } = require('../config');

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

async function getLeaderboardForOrganization(orgId, page = 1, pageSize = pageLimit, reqInfo) {
  // Make sure page is 1 or heigher
  page = Math.max(Number(page), 1);
  // Clamp size between 1 and size limit to prevent crashes
  let size = clamp(Number(pageSize), 1, pageLimit);
  const offset = (page - 1) * size;
  const walletArray = await wallets.getWalletLeaderboard(orgId, offset, size);
  if (!walletArray) {
    const noLeaderboardText = 'No wallets found for organization';
    message = slackComponent.message.private(reqInfo);
    message.attachments = slackComponent.attachments.confirmation(noLeaderboardText);
    await slackModel.message.postMessage(message);
    return {
      statusCode: 404,
      data: {
        message: noLeaderboardText,
      },
    };
  }
  const leaderboardText = 'Here are the best performers in your workspace: ';
  message = slackComponent.message.private(reqInfo);
  message.attachments = slackComponent.attachments.confirmation(leaderboardText);
  await slackModel.message.postMessage(message);
  console.log(walletArray);
  walletArray.map(async wallet => {
    const data = {
      content: `\n <@${wallet.slack_mem_id}> - ${wallet.wallet} bravos`,
    };

    const messageList = slackComponent.message.private(reqInfo);
    messageList.attachments = slackComponent.attachments.channelNotification(data, 'leaderboard');

    await slackModel.message.postMessage(messageList);
  });

  return {
    statusCode: 200,
    data: {
      data: walletArray,
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
