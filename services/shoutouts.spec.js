const server = require('../index');
const request = require('supertest');

describe('/shoutouts', () => {
  it('[GET] /api/shoutouts', () => {
    return request(server)
      .get('/api/shoutouts')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });
});
