const db = require('../dbConfig');
const action = require('./actions');

beforeEach(async () => {
  await db.raw('truncate actions cascade;');
});

afterEach(async () => {
  await db.raw('truncate actions cascade;');
});

afterAll(async done => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
  done();
});
