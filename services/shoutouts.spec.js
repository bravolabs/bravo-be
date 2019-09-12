const server = require('../express-server');
const request = require('supertest');

describe('/shoutouts', () => {
  it('[GET] /api/shoutouts/userId', () => {
    return request(server)
      .get('/api/shoutouts/HHGJSHUHHUQUHHUUH')
      .expect(401)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
      });
  });
});
