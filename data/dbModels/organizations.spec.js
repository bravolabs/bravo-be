const db = require('../dbConfig');
const orgs = require('./organizations');
const users = require('./users');
const shoutouts = require('./shoutouts');

beforeEach(async () => {
  await db.raw('truncate organizations cascade;');
});

afterAll(async done => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
  done();
});

describe('Create organizations', () => {
  it('can create organizations', async done => {
    expect.assertions(2);

    let organizations = await orgs.read();
    expect(organizations).toHaveLength(0);

    await orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Lambda-School',
      channel_name: '#djjjd',
      channel_id: '83829',
      access_token: '8299ddjdddd',
    });
    await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs',
      channel_name: '#djjjd',
      channel_id: '83829',
      access_token: '8299ddjdddd',
    });
    organizations = await orgs.read();
    expect(organizations).toHaveLength(2);
    done();
  });

  it('can create organizations correctly', async done => {
    expect.assertions(2);

    let organizations = await orgs.read();
    expect(organizations).toHaveLength(0);

    const result = await orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Lambda-School',
      channel_name: '#djjjd',
      channel_id: '83829',
      access_token: '8299ddjdddd',
    });
    expect(result.name).toBe('Lambda-School');
    done();
  });

  it('returns the newly created organization', async done => {
    expect.assertions(1);

    const organization = await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs',
      channel_name: '#djjjd',
      channel_id: '83829',
      access_token: '8299ddjdddd',
    });
    expect(organization.name).toBe('Bravo-Labs');
    done();
  });

  it('cannot duplicate an organization', async done => {
    expect.assertions(1);

    await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs',
      channel_name: '#djjjd',
      channel_id: '83829',
      access_token: '8299ddjdddd',
    });
    const organization = await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs',
      channel_name: '#djjjd',
      channel_id: '83829',
      access_token: '8299ddjdddd',
    });
    expect(organization.name).toBe('Bravo-Labs');
    done();
  });
});

describe('Read organizations', () => {
  it('can read organizations from the db!', async done => {
    expect.assertions(3);

    let organizations = await orgs.read();
    expect(organizations).toHaveLength(0);

    await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs',
      channel_name: '#djjjd',
      channel_id: '83829',
      access_token: '8299ddjdddd',
    });
    await orgs.create({
      slack_org_id: 'AWRUIDOSOS',
      name: 'Lambda-School',
      channel_name: '#djjjd',
      channel_id: '83829',
      access_token: '8299ddjdddd',
    });
    organizations = await orgs.read();
    expect(organizations[0].name).toBe('Bravo-Labs');
    expect(organizations[1].name).toBe('Lambda-School');
    done();
  });

  it('can read an organization by its slack ID', async done => {
    expect.assertions(2);

    let organizations = await orgs.read();
    expect(organizations).toHaveLength(0);

    await orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Lambda-School',
      channel_name: '#djjjd',
      channel_id: '83829',
      access_token: '8299ddjdddd',
    });
    organizations = await orgs.read('AQYENEKWQS');
    expect(organizations.name).toBe('Lambda-School');
    done();
  });
});

describe('Update organizations', () => {
  it('can update an organization by ID', async done => {
    expect.assertions(2);

    let organizations = await orgs.read();
    expect(organizations).toHaveLength(0);

    let result = await orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Lambda-School',
      channel_name: '#djjjd',
      channel_id: '83829',
      access_token: '8299ddjdddd',
    });
    result = await orgs.update(result.id, {
      name: 'Bravo-Labs',
    });
    expect(result[0].name).toBe('Bravo-Labs');
    done();
  });
});

describe('Remove organizations', () => {
  it('can remove an organization by ID', async done => {
    expect.assertions(2);

    let organizations = await orgs.read();
    expect(organizations).toHaveLength(0);

    let result = await orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Bravo-Labs',
      channel_name: '#djjjd',
      channel_id: '83829',
      access_token: '8299ddjdddd',
    });
    result = await orgs.remove(result.id);
    expect(result[0].name).toBe('Bravo-Labs');
    done();
  });
});
