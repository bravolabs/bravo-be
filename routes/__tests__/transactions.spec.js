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
let org_id;
let giver_id;
let receiver_id;

beforeAll(async () => {
  await db.raw('truncate actions cascade;');
  createdAction = await action.create({
    name: 'testAction',
    reward: 5,
  });

  // We're stubbing the authenticate middleware here. Authenticating with slack seems
  // to sparingly work in tests, so instead we are just negating it entierly.
  sinon.stub(auth, 'authenticate').callsFake(function(req, res, next) {
    return next();
  });
  server = require('../../express-server');
});

beforeEach(async done => {
  await db.raw('truncate organizations cascade;');
  await db.raw('truncate transactions cascade;');

  const data = await stageData();
  await transactionModel.create({
    ...data,
    action_id: createdAction.id,
  });
  org_id = data.org_id;
  giver_id = data.giver_id;
  receiver_id = data.receiver_id;

  done();
});

afterEach(async () => {
  await db.raw('truncate organizations cascade;');
  await db.raw('truncate transactions cascade;');
});

afterAll(async done => {
  await db.raw('truncate actions cascade;');
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  // Restore the stubbed authenticate in case other tests need it.
  sinon.restore();
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
  it('[GET] /api/transactions/org/full', () => {
    return request(server)
      .get('/api/transactions/org/full/' + org_id)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.data[0]).toHaveProperty('giverSlackId', '773jjf');
        expect(res.body.data[0]).toHaveProperty('reward', 5);
        expect(res.body.data[0]).toHaveProperty('receiverName', 'Aaron');
      });
  });
  it('[GET] /api/transactions/user', () => {
    return request(server)
      .get('/api/transactions/user/' + giver_id)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.data[0]).toHaveProperty('giverSlackId', '773jjf');
        expect(res.body.data[0]).toHaveProperty('reward', 5);
        expect(res.body.data[0]).toHaveProperty('receiverName', 'Aaron');
      });
  });
});
