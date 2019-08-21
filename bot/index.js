const express = require('express');
const routeController = require('./routes');

const router = express.Router();

router.use(routeController);

module.exports = router;
