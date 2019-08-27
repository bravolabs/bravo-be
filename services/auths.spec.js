const server = require('../index');
const request = require('supertest');

describe('/auths', () => {
  it('[POST] /api/auths', () => {
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
});