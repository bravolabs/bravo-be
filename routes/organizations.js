const express = require('express');
const service = require('../services/organizations');
const auth = require('./utils/auth');
const { validateId } = require('./utils/validator');

const router = express.Router();
router.use('/', auth.authenticate);
router.get('/:id/shoutouts', validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.getShoutouts(id);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/users', validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.getUsers(id);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
