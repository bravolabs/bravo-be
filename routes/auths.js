const express = require('express');
const service = require('../services/auths');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const { accessToken, userId, } = req.body;
    const result = await service.loginUser(accessToken, userId);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    res.status(500).json({
      error: 'server error',
    });
  }
});

module.exports = router;
