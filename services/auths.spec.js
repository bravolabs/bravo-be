const server = require('../express-server');
const request = require('supertest');

describe('/auths', () => {
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
});