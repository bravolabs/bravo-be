const express = require('express');
const { validateLoginCredentials } = require('./utils/validator');
const verifySlackToken = require('./utils/verifySlackToken');
const organizationExists = require('./utils/organizationExists');
const userExists = require('./utils/userExists');
const service = require('../services/auths');
const shoutout = require('../data/dbModels/shoutouts');

const router = express.Router();

router.post(
  '/',
  validateLoginCredentials,
  verifySlackToken,
  organizationExists,
  userExists,
  async (req, res, next) => {
    const { user } = req;
    try {
      const result = await service.loginUser(user);
      res.status(result.statusCode).json(result.data);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add', async (req, res, next) => {
  try {
    const user = req.body;
    const addedUser = await shoutout.create(user);
    res.json(addedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
