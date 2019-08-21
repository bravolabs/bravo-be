const db = require('../dbConfig');
const orgs = require('./organizations');

beforeEach(async () => {
  await db.raw('truncate organizations cascade;');
});
