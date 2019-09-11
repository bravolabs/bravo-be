const db = require('../dbConfig');
const walletsModel = require('./wallets');
const usersModel = require('./users');
const orgsModel = require('./organizations');

beforeEach(async () => {
  await db.raw('truncate wallets cascade;');
  await db.raw('truncate users cascade;');
});

afterEach(async () => {
  await db.raw('truncate wallets cascade;');
  await db.raw('truncate users cascade;');
});

afterAll(async done => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
  done();
});

const stageData = async () => {
  const { id: org_id } = await orgsModel.create({
    slack_org_id: 'dhbsh3ii3',
    name: 'hbbwej3',
    channel_name: 'bots',
    channel_id: 'ejwjkqe',
    access_token: 'bfqhjwfbwjf',
  });
  return usersModel.create({
    org_id: org_id,
    slack_mem_id: 'testing123',
    email: 'iamatest@gmail.com',
    name: 'test',
  });
};

describe('Create wallets', () => {
  it('can create wallet for user', async done => {
    expect.assertions(2);

    let wallets = await db('wallets');
    expect(wallets).toHaveLength(0);

    let user = await stageData();
    let newWallet = await walletsModel.create({
      user_id: user.id,
    });

    wallets = await db('wallets');
    expect(wallets).toHaveLength(1);
    done();
  });

  it('can get wallet for user', async done => {
    expect.assertions(3);

    let wallets = await db('wallets');
    expect(wallets).toHaveLength(0);

    let user = await stageData();
    await walletsModel.create({
      user_id: user.id,
    });

    wallets = await db('wallets');
    expect(wallets).toHaveLength(1);

    let newWallet = await walletsModel.readByUserId(user.id);
    expect(newWallet).toHaveProperty('amount', 0);
    done();
  });

  it('can update wallet by user', async done => {
    expect.assertions(4);

    let wallets = await db('wallets');
    expect(wallets).toHaveLength(0);

    let user = await stageData();
    await walletsModel.create({
      user_id: user.id,
    });

    wallets = await db('wallets');
    expect(wallets).toHaveLength(1);

    let newWallet = await walletsModel.readByUserId(user.id);
    expect(newWallet).toHaveProperty('amount', 0);

    newWallet = await walletsModel.updateByUserId(user.id, 100);
    expect(newWallet).toHaveProperty('amount', 100);
    done();
  });
});
