const transactions = require('../data/dbModels/transactions');
const actions = require('../data/dbModels/actions');
const wallets = require('../data/dbModels/wallets');

async function ProcessTransaction(userId, giverId, orgId, shoutoutId, actionNameOrId) {
  let action;
  if (typeof actionNameOrId === 'string') {
    action = await actions.readByName(actionNameOrId);
  } else {
    action = await actions.readById(actionNameOrId);
  }
  if (!action) throw new Error('action invalid');

  const transaction = await transactions.create({
    org_id: orgId,
    giver_id: giverId,
    receiver_id: userId,
    action_id: action.id,
    shoutout_id: shoutoutId,
  });
}

module.exports = {
  ProcessTransaction,
};
