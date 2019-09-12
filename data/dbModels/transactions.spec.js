const db = require('../dbConfig');
const action = require('./actions');
const shoutout = require('./shoutouts');
const user = require('./users');
const orgs = require('./organizations');
const transactionModel = require('./transactions');

let createdAction = null;

beforeAll(async () => {
  createdAction = await action.create({
    name: 'reaction',
    reward: 5,
  });
});

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
    bot_access_token: 'test_token',
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
  it('can create transaction', async done => {
    expect.assertions(2);
    let transactions = await db('transactions');
    expect(transactions).toHaveLength(0);
    const data = await stageData();
    await transactionModel.create({
      ...data,
      action_id: createdAction.id,
    });

    transactions = await db('transactions');
    expect(transactions).toHaveLength(1);
    done();
  });
  it('can read full transaction data', async done => {
    expect.assertions(5);
    let transactions = await db('transactions');
    expect(transactions).toHaveLength(0);
    const data = await stageData();
    await transactionModel.create({
      ...data,
      action_id: createdAction.id,
    });

    transactions = await db('transactions');
    expect(transactions).toHaveLength(1);

    transactions = await transactionModel.readWithData(data.org_id);
    expect(transactions[0]).toHaveProperty('reward', 5);
    expect(transactions[0]).toHaveProperty('receiverName', 'Aaron');
    expect(transactions[0]).toHaveProperty('action', 'reaction');
    done();
  });
  it('can read transactions per user', async done => {
    expect.assertions(5);
    let transactions = await db('transactions');
    expect(transactions).toHaveLength(0);
    const data = await stageData();
    await transactionModel.create({
      ...data,
      action_id: createdAction.id,
    });

    transactions = await db('transactions');
    expect(transactions).toHaveLength(1);

    transactions = await transactionModel.readByUser(data.receiver_id);
    expect(transactions[0]).toHaveProperty('reward', 5);
    expect(transactions[0]).toHaveProperty('receiverName', 'Aaron');
    expect(transactions[0]).toHaveProperty('action', 'reaction');
    done();
  });
});
