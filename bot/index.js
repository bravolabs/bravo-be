const express = require('express');
const commandsController = require('./controllers/commands');

const router = express.Router();

router.use(commandsController);

module.exports = router;