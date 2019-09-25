const express = require('express');
const service = require('../services/wallet');
const auth = require('./utils/auth');
const pagination = require('./utils/paginationWare');

const router = express.Router();
router.use('/', auth.authenticate);

router.get('/:page?/:pageSize?', pagination, async (req, res, next) => {
  try {
    let orgId = req.user.org_id;
    const { limit, offset, previous, next } = req;
    const result = await service.getLeaderboardForOrganization(orgId, {
      limit,
      offset,
      previous,
      next,
    });
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
