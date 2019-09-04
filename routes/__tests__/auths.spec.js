const db = require('../../data/dbConfig');
const server = require('../../express-server');
const request = require('supertest');
const { slack } = require('../../config');
const nock = require('nock');
const organizations = require('../../data/dbModels/organizations');

beforeEach(async () => {
  await db.raw('truncate organizations cascade;');
  await db.raw('truncate users cascade;');
  await db.raw('truncate shoutouts cascade;');
});

afterAll(async done => {
  await new Promise(resolve => setTimeout(() => resolve(), 500));
  nock.cleanAll();
  done();
});

describe('/auths route', () => {
  it('[POST] /api/auths (accesToken required)', () => {
    return request(server)
      .post('/api/auths')
      .send({})
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({
          message: 'Missing required accessToken field',
        });
      });
  });

  it('[POST] /api/auths (userId required)', () => {
    return request(server)
      .post('/api/auths')
      .send({
        accessToken: 'xxxuser.YHHASY.ANAH72c.77HSY.HSH',
      })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({
          message: 'Missing required userId field',
        });
      });
  });

  it('[POST] /api/auths (Should Ensure User workspace exists)', () => {
    const accessToken = 'xoxp-74333-54487-74136-4bcb14e';
    const userId = 'OSJRJGOSJT';
    nock(slack.baseUrl)
      .get(`/users.info?token=${accessToken}&user=${userId}`)
      .reply(200, {
        ok: true,
        user: {
          id: 'OSJRJGOSJT',
          team_id: 'KSDKJTNWNR',
          real_name: 'Example User',
          profile: {
            image_512: 'https://secure.gravatar.com/avatar/512.png',
          },
        },
      });

    return request(server)
      .post('/api/auths')
      .send({
        accessToken,
        userId,
      })
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({
          message: 'Workspace not found. Please contact your workspace admin to install Bravo',
        });
      });
  });

  it('[POST] /api/auths (Should Log user with existing Organization in)', async () => {
    const accessToken = 'xoxp-2567-2525-74136-4bcb14e';
    const userId = 'KJSDNKJN';
    const name = 'Example User';
    const avatar = 'https://secure.gravatar.com/avatar/512.png';
    await organizations.create({
      slack_org_id: 'KSJSJENK',
      name: 'Sample',
      channel_name: '#sample',
      channel_id: 'NKKFKEEJ',
      access_token: accessToken,
    });
    nock(slack.baseUrl)
      .get(`/users.info?token=${accessToken}&user=${userId}`)
      .reply(200, {
        ok: true,
        user: {
          id: 'KJSDNKJN',
          team_id: 'KSJSJENK',
          real_name: name,
          profile: {
            image_512: avatar,
          },
        },
      });

    return request(server)
      .post('/api/auths')
      .send({
        accessToken,
        userId,
      })
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.name).toEqual(name);
        expect(res.body.avatar).toEqual(avatar);
        expect(res.body).toHaveProperty('token');
      });
  });

  it('[POST] /api/auths (catch error during login)', async () => {
    const accessToken = 'xoxp-2567';
    const userId = 'KJSD';
    nock(slack.baseUrl)
      .get(`/users.info?token=${accessToken}&user=${userId}`)
      .reply(200, {
        ok: true,
        error: 'invalid_auth',
      });

    return request(server)
      .post('/api/auths')
      .send({
        accessToken,
        userId,
      })
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({
          error: 'server error',
        });
      });
  });
});
