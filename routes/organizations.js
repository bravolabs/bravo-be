const express = require('express');
const service = require('../services/organizations');
const auth = require('./utils/auth');

const router = express.Router();
router.use('/', auth.authenticate);
router.get('/:id/shoutouts', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.getShoutouts(id);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    res.status(500).json({
      error: 'server error',
    });
  }
});

module.exports = router;
