const db = require('../dbConfig');
const orgs = require('./organizations');

beforeEach(async () => {
  await db.raw('truncate organizations cascade;');
});

describe('Create organizations', () => {
  it('can create organizations', () => {
    orgs.read()
    .then(result => {
      expect(result).toHaveLength(0);
    });

    orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Lambda-School' 
    })
    .then(() => orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs' 
    }))
    .then(() => orgs.read())
    .then(result => {
      expect(result).toHaveLength(2);
    });
  });

  it('can create organizations correctly', () => {
    
    orgs.read()
    .then(result => {
      expect(result).toHaveLength(0);
    });
    //let organizations = await orgs.read();
    //expect(organizations).toHaveLength(0);

    /* await orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Lambda-School' 
    });
    await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs' 
    });
    organizations = await orgs.read(); */
    orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Lambda-School' 
    })
    .then(() => orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs' 
    }))
    .then(() => orgs.read())
    .then(result => {
      expect(result[0].name).toBe('Lambda-School');
      expect(result[1].name).toBe('Bravo-Labs');
    });
  });

  it('returns the newly created organization', () => {
    /* const organization = await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs' 
    }); */
    orgs.create({
      slack_org_id: 'AQYENEKWQS',
      name: 'Lambda-School' 
    })
    .then(result => {
      expect(result[0].name).toBe('Lambda-School');
    });
    //expect(organization[0].name).toBe('Bravo-Labs');
  });

  it('cannot duplicate an organization', () => {
    /* await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs' 
    });
    const organization = await orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs' 
    });
    expect(organization[0].name).toBe('Bravo-Labs'); */
    orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs' 
    })
    .then(() => orgs.create({
      slack_org_id: 'SWYEUJGHDR',
      name: 'Bravo-Labs' 
    }))
    .then(result => {
      expect(result[0].name).toBe('Bravo-Labs');
    });
  });
});
