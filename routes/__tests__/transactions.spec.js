const db = require('../../data/dbConfig');
const request = require('supertest');
const sinon = require('sinon');
const action = require('../../data/dbModels/actions');
const shoutout = require('../../data/dbModels/shoutouts');
const user = require('../../data/dbModels/users');
const orgs = require('../../data/dbModels/organizations');
const transactionModel = require('../../data/dbModels/transactions');
const auth = require('../utils/auth');

let server;
let createdAction = null;

beforeAll(async () => {
  createdAction = await action.create({
    name: 'reaction',
    reward: 5,
  });
  sinon.stub(auth, 'authenticate').callsFake(function(req, res, next) {
    return next();
  });
  server = require('../../express-server');
});

beforeEach(async () => {
  await db.raw('truncate organizations cascade;');
  await db.raw('truncate transactions cascade;');

  const data = await stageData();
  await transactionModel.create({
    ...data,
    action_id: createdAction.id,
  });
});

afterEach(async () => {
  await db.raw('truncate organizations cascade;');
  await db.raw('truncate transactions cascade;');
});

afterAll(async done => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
  auth.authenticate.restore();
  done();
});

const stageData = async () => {
  const { id: org_id } = await orgs.create({
    slack_org_id: 'dhbsh3ii3',
    name: 'hbbwej3',
    channel_name: 'bots',
    channel_id: 'ejwjkqe',
    access_token: 'bfqhjwfbwjf',
  });

  const { id: giver_id } = await user.create({
    org_id: org_id,
    slack_mem_id: '773jjf',
    email: 'ogwurujohnson@gmail.com',
    name: 'Johnny',
  });

  const { id: receiver_id } = await user.create({
    org_id: org_id,
    slack_mem_id: '773jjfaf',
    email: 'aaronthompson@gmail.com',
    name: 'Aaron',
  });

  const { id: shoutout_id } = await shoutout.create({
    giver_id,
    receiver_id,
    message: 'Amazing Job this week',
  });

  return {
    org_id,
    giver_id,
    receiver_id,
    shoutout_id,
  };
};

describe('Get transaction', () => {
  it('can get joined transactions for org', async done => {
    expect.assertions(2);
  });
});
