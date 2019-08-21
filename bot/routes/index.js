const express = require('express');
const router = express.Router();

const { commands } = require('../controllers/commands');
const { interactions } = require('../controllers/interactions');

router.get('/', (req, res) => {
  res.send('Welcome to Bravo Labs');
});

router.post('/commands', commands);
router.post('/interactions', interactions);

module.exports = router;
