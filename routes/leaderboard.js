const express = require('express');
const service = require('../services/wallet');
const auth = require('./utils/auth');
const pagination = require('./utils/paginationWare');

const router = express.Router();
router.use('/', auth.authenticate);

router.get('/:page?/:pageSize?', pagination, async (req, res, next) => {
  try {
    let { page, pageSize } = req.params;
    let orgId = req.user.org_id;
    const result = await service.getLeaderboardForOrganization(orgId, page, pageSize);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
