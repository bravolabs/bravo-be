const express = require('express');
const service = require('../services/wallet');
const auth = require('./utils/auth');

const router = express.Router();
router.use('/', auth.authenticate);

router.get('/', async (req, res, next) => {
  try {
    let userId = req.user.id;
    const result = await service.getUserWallet(userId);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
