const express = require('express');
const service = require('../services/transactions');
const auth = require('./utils/auth');

const router = express.Router();
router.use('/', auth.authenticate);

router.get('/org/full/:orgId/:page?/:pageSize?', async (req, res, next) => {
  try {
    let { orgId, page, pageSize } = req.params;
    const result = await service.getFullTransactionsForOrganization(orgId, page, pageSize);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    next(error);
  }
});

router.get('/org/basic/:orgId/:page?/:pageSize?', async (req, res, next) => {
  try {
    let { orgId, page, pageSize } = req.params;
    const result = await service.getTransactionsForOrganization(orgId, page, pageSize);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    next(error);
  }
});

router.get('/user/:userId/:page?/:pageSize?', async (req, res, next) => {
  try {
    let { userId, page, pageSize } = req.params;
    const result = await service.getTransactionsForUser(userId, page, pageSize);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
