const express = require('express');
const service = require('../services/users');
const auth = require('./utils/auth');
const { validateId } = require('./utils/validator');

const router = express.Router();
router.use('/', auth.authenticate);

router.get('/:userId', validateId, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await service.getShoutouts(userId);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    res.status(500).json({
      error: 'server error',
    });
  }
});

module.exports = router;
