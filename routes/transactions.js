const express = require('express');
const service = require('../services/transactions');
const auth = require('./utils/auth');

const router = express.Router();
router.use('/', auth.authenticate);

router.get('/org/full/:orgId(/:page)?(/:pageSize)?', async (req, res, next) => {
  try {
    let { orgId, page, pageSize } = req.params;
    const result = await service.getFullTransactionsForOrganization(orgId, page, pageSize);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    next(error);
  }
});
