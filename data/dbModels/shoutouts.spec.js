const db = require('../dbConfig');
const shoutout = require('./shoutouts');
const user = require('./users');
const orgs = require('./organizations');

beforeEach(async () => {
  await db.raw('truncate organizations cascade;');
});

afterEach(async () => {
  await db.raw('truncate organizations cascade;');
});

afterAll(async done => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
  done();
});

describe('Create shoutouts', () => {
  it('can create shoutouts', async done => {
    expect.assertions(2);

    let shoutouts = await shoutout.readAll();
    expect(shoutouts).toHaveLength(0);

    const organization = await orgs.create({
      slack_org_id: 'dhbsh3ii3',
      name: 'hbbwej3',
      channel_name: 'bots',
      channel_id: 'ejwjkqe',
      access_token: 'bfqhjwfbwjf',
      bot_access_token: 'test_token',
    });

    const userpersona = await user.create({
      org_id: organization.id,
      slack_mem_id: '773jjf',
      email: 'ogwurujohnson@gmail.com',
      name: 'Johnny',
    });

    await shoutout.create({
      giver_id: userpersona.id,
      receiver_id: userpersona.id,
      message: 'Amazing Job this week',
    });
    await shoutout.create({
      giver_id: userpersona.id,
      receiver_id: userpersona.id,
      message: 'Amazing Job too this week',
    });
    shoutouts = await shoutout.readAll();
    expect(shoutouts).toHaveLength(2);
    done();
  });

  it('can read shoutouts for a user correctly', async done => {
    expect.assertions(2);

    let shoutouts = await shoutout.readAll();
    expect(shoutouts).toHaveLength(0);

    const organization = await orgs.create({
      slack_org_id: 'dhbsh3ii3',
      name: 'hbbwej3',
      channel_name: 'bots',
      channel_id: 'ejwjkqe',
      access_token: 'bfqhjwfbwjf',
      bot_access_token: 'test_token',
    });

    const userpersona = await user.create({
      org_id: organization.id,
      slack_mem_id: '773jjf',
      email: 'ogwurujohnson@gmail.com',
      name: 'Johnny',
    });

    await shoutout.create({
      giver_id: userpersona.id,
      receiver_id: userpersona.id,
      message: 'Amazing Job this week',
    });
    await shoutout.create({
      giver_id: userpersona.id,
      receiver_id: userpersona.id,
      message: 'Amazing Job too this week',
    });
    shoutouts = await shoutout.read(userpersona.id);
    expect(shoutouts).toHaveLength(2);
    done();
  });
});
