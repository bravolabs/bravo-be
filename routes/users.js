const express = require('express');
const service = require('../services/users');
const auth = require('./utils/auth');
const { validateId } = require('./utils/validator');

const router = express.Router();
router.use('/', auth.authenticate);

router.get('/:userId/shoutouts', validateId, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await service.getShoutouts(userId);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', validateId, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await service.getUserInfo(userId);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
