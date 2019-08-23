const db = require('../dbConfig');
const orgs = require('./organizations');

beforeEach(async () => {
  await db.raw('truncate organizations cascade;');
});

afterAll(async (done) => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
  done();
}); 

describe('Create organizations', () => {
  it('can create organizations', async (done) => {
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
    done();
  });

  it('can create organizations correctly', async (done) => {
    expect.assertions(2);
    
    let organizations = await orgs.read();
    expect(organizations).toHaveLength(0);

    const result = await orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Lambda-School' 
    });
    expect(result[0].name).toBe('Lambda-School');
    done();
  });

  it('returns the newly created organization', async (done) => {
    expect.assertions(1);

    const organization = await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs' 
    });
    expect(organization[0].name).toBe('Bravo-Labs');
    done();
  });

  it('cannot duplicate an organization', async (done) => {
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
    done();
  });
});

describe('Read organizations', () => {
  it('can read organizations from the db!', async (done) => {
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
    done();
  });

  it('can read an organization by its slack ID', async (done) => {
    expect.assertions(2);
    
    let organizations = await orgs.read();
    expect(organizations).toHaveLength(0);

    let result = await orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Lambda-School' 
    });
    result = await orgs.read(result[0].slack_org_id);
    expect(result.name).toBe('Lambda-School');
    done();
  });
});

describe('Update organizations', () => {
  it('can update an organization by ID', async (done) => {
    expect.assertions(2);
    
    let organizations = await orgs.read();
    expect(organizations).toHaveLength(0);

    let result = await orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Lambda-School' 
    });
    result = await orgs.update(result[0].id, {
      name: 'Bravo-Labs'
    });
    expect(result[0].name).toBe('Bravo-Labs');
    done();
  });
});

describe('Remove organizations', () => {
  it('can remove an organization by ID', async (done) => {
    expect.assertions(2);
    
    let organizations = await orgs.read();
    expect(organizations).toHaveLength(0);

    let result = await orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Bravo-Labs' 
    });
    result = await orgs.remove(result[0].id);
    expect(result[0].name).toBe('Bravo-Labs');
    done();
  });
});
