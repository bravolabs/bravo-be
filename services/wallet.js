const transactions = require('../data/dbModels/transactions');
const actions = require('../data/dbModels/actions');
const wallets = require('../data/dbModels/wallets');

async function ProcessTransaction(userId, giverId, orgId, shoutoutId, actionNameOrId) {
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
    const newAmount = userWallet.amount + action.reward;
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
};
