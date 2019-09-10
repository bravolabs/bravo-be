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
