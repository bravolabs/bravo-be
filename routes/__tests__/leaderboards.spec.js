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

beforeEach(async done => {
  await db.raw('truncate organizations cascade;');
  await db.raw('truncate users cascade;');
  await db.raw('truncate wallets cascade;');

  const data = await stageData();
  org_id = data.org_id;

  done();
});

afterEach(async () => {
  await db.raw('truncate organizations cascade;');
  await db.raw('truncate users cascade;');
  await db.raw('truncate wallets cascade;');
});

afterAll(async done => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  // Restore the stubbed authenticate in case other tests need it.
  sinon.restore();
  done();
});

describe('Get leaderboard', () => {
  it('[GET] /api/leaderboard/', () => {
    return request(server)
      .get('/api/leaderboard')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body.data[0]).toHaveProperty('wallet', 100);
        expect(res.body.data[1]).toHaveProperty('wallet', 50);
      });
  });
});
