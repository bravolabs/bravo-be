const express = require('express');
const service = require('../services/shoutouts');

const router = express.Router();

router.get('/', service.getShoutouts);

module.exports = router;
