const db = require('../dbConfig');
const orgs = require('./organizations');

beforeEach(async () => {
  await db.raw('truncate organizations cascade;');
});

afterAll(async () => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
}); 

describe('Create organizations', () => {
  it('can create organizations', async () => {
    expect.assertions(2);
    
    let organizations = await orgs.read();
    expect(organizations).toHaveLength(0);

    await orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Lambda-School' 
    });
    await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs' 
    });
    organizations = await orgs.read();
    expect(organizations).toHaveLength(2);
  });

  it('can create organizations correctly', async () => {
    expect.assertions(3);
    
    let organizations = await orgs.read();
    expect(organizations).toHaveLength(0);

    await orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Lambda-School' 
    });
    await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs' 
    });
    organizations = await orgs.read();
    expect(organizations[0].name).toBe('Lambda-School');
    expect(organizations[1].name).toBe('Bravo-Labs');
  });

  it('returns the newly created organization', async () => {
    expect.assertions(1);

    const organization = await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs' 
    });
    expect(organization[0].name).toBe('Bravo-Labs');
  });

  it('cannot duplicate an organization', async () => {
    expect.assertions(1);

    await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs' 
    });
    const organization = await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs' 
    });
    expect(organization[0].name).toBe('Bravo-Labs'); 
  });
});
