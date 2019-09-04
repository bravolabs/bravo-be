const express = require('express');
const { validateLoginCredentials } = require('./utils/validator');
const service = require('../services/auths');
const shoutout = require('../data/dbModels/shoutouts');

const router = express.Router();

router.post('/', validateLoginCredentials, async (req, res, next) => {
  try {
    const { accessToken, userId } = req.body;
    const result = await service.loginUser(accessToken, userId);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    next(error);
  }
});

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
