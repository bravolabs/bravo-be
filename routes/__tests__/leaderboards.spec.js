const db = require('../../data/dbConfig');
const request = require('supertest');
const sinon = require('sinon');
const user = require('../../data/dbModels/users');
const orgs = require('../../data/dbModels/organizations');
const wallets = require('../../data/dbModels/wallets');
const auth = require('../utils/auth');

let server;
let org_id;

beforeAll(async () => {
  // We're stubbing the authenticate middleware here. Authenticating with slack seems
  // to sparingly work in tests, so instead we are just negating it entierly.
  sinon.stub(auth, 'authenticate').callsFake(function(req, res, next) {
    // Return a user to ensure organization can be recovered for endpoint
    req.user = {
      org_id: org_id || 1,
    };
    return next();
  });
  server = require('../../express-server');
});

const stageData = async () => {
  const { id: org_id } = await orgs.create({
    slack_org_id: 'dhbsh3ii3',
    name: 'hbbwej3',
    channel_name: 'bots',
    channel_id: 'ejwjkqe',
    access_token: 'bfqhjwfbwjf',
  });

  const { id: user_1 } = await user.create({
    org_id: org_id,
    slack_mem_id: '773jjf',
    email: 'ogwurujohnson@gmail.com',
    name: 'Johnny',
  });

  const { id: user_2 } = await user.create({
    org_id: org_id,
    slack_mem_id: '773jjfaf',
    email: 'aaronthompson@gmail.com',
    name: 'Aaron',
  });

  await wallets.create({
    user_id: user_1,
    amount: 50,
  });

  await wallets.create({
    user_id: user_2,
    amount: 100,
  });

  return {
    org_id,
    user_1,
    user_2,
  };
};
