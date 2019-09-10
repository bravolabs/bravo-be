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
