const transactions = require('../data/dbModels/transactions');
const actions = require('../data/dbModels/actions');
const wallets = require('../data/dbModels/wallets');

async function ProcessTransaction(userId, giverId, orgId, shoutoutId, actionNameOrId) {
  try {
    let action;
    if (typeof actionNameOrId === 'string') {
      action = await actions.readByName(actionNameOrId);
    } else {
      action = await actions.readById(actionNameOrId);
    }
    if (!action) throw new Error('action invalid');

    const userWallet = await wallets.readByUserId(userId);
    if (!userWallet) throw new Error("Couldn't get user wallet");

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
