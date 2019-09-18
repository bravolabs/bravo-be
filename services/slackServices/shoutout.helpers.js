const uuid = require('uuid');
const { getUser } = require('./users');
const { ProcessTransaction } = require('../wallet');
const ShoutOut = require('../../data/dbModels/shoutouts');

exports.saveToDatabase = async dbInfo => {
  const reciever = await getUser(dbInfo.receiver_id, dbInfo.organization_id, dbInfo.access_token);
  const giver = await getUser(dbInfo.giver_id, dbInfo.organization_id, dbInfo.access_token);

  const shoutoutData = {
    giver_id: giver.id,
    receiver_id: reciever.id,
    message: dbInfo.message,
  };

  const result = await ShoutOut.create(shoutoutData);
  await ProcessTransaction(reciever.id, giver.id, reciever.org_id, result.id, 'shoutout', true);
  return result;
};
