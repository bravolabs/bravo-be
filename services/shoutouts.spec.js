const server = require('../index');
const request = require('supertest');

describe('/shoutouts', () => {
  it('[GET] /api/shoutouts/userId', () => {
    return request(server)
      .get('/api/shoutouts/HHGJSHUHHUQUHHUUH')
      .expect(404)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
      });
  });
});
