const db = require('../dbConfig');
const shoutout = require('./shoutouts');
const user = require('./users');
const orgs = require('./organizations');
const transaction = require('./transactions');

beforeEach(async () => {
  await db.raw('truncate organizations cascade;');
  await db.raw('truncate transactions cascade;');
});

afterEach(async () => {
  await db.raw('truncate organizations cascade;');
  await db.raw('truncate transactions cascade;');
});

afterAll(async done => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
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

describe('Create transactions', () => {
  it('can create actions', async done => {
    expect.assertions(1);
    let transactions = await db('transactions');
    expect(transactions).toHaveLength(0);
    done();
  });
});
