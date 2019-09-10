const db = require('../dbConfig');
const actionsModel = require('./actions');

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

describe('Create actions', () => {
  it('can create actions', async done => {
    expect.assertions(2);

    let actions = await db('actions');
    expect(actions).toHaveLength(0);

    await actionsModel.create({
      name: 'shoutout',
      reward: 10,
    });

    await actionsModel.create({
      name: 'reaction',
      reward: 5,
    });

    actions = await db('actions');
    expect(actions).toHaveLength(2);
    done();
  });

  it('can read actions by id', async done => {
    expect.assertions(3);

    let actions = await db('actions');
    expect(actions).toHaveLength(0);

    let { id } = await actionsModel.create({
      name: 'shoutout',
      reward: 10,
    });

    let newAction = await actionsModel.readById(id);
    expect(newAction).toHaveProperty('name', 'shoutout');
    expect(newAction).toHaveProperty('reward', 10);
    done();
  });
});
