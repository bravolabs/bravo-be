const db = require('../dbConfig');
const walletsModel = require('./wallets');
const usersModel = require('./users');

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
});
