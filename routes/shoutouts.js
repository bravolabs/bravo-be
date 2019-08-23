const express = require('express');
const service = require('../services/shoutouts');

const router = express.Router();

router.get('/:userId', service.getShoutouts);

module.exports = router;
