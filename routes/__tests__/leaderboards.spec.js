const db = require('../../data/dbConfig');
const request = require('supertest');
const sinon = require('sinon');
const user = require('../../data/dbModels/users');
const orgs = require('../../data/dbModels/organizations');
const wallets = require('../../data/dbModels/wallets');
const auth = require('../utils/auth');

let server;

beforeAll(async () => {
  // We're stubbing the authenticate middleware here. Authenticating with slack seems
  // to sparingly work in tests, so instead we are just negating it entierly.
  sinon.stub(auth, 'authenticate').callsFake(function(req, res, next) {
    // Return a user to ensure organization can be recovered for endpoint
    req.user = {
      org_id: 1,
    };
    return next();
  });
  server = require('../../express-server');
});
