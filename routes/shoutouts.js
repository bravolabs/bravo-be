const express = require('express');
const service = require('../services/shoutouts');

const router = express.Router();

router.get('/:userId', async (req, res, next) => {
  try {
      const { userId } = req.params;
      const result = await service.getShoutouts(userId);
      res.status(result.statusCode)
        .json(result.data);
  } catch(error) {
    res.status(500)
      .json({
        error: 'server error'
      });
  }
});

module.exports = router;
