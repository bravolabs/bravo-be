const express = require('express');

const router = express.Router();

router.all('/commands', async (req, res) => {
  res.send('boyoyo');
});

module.exports = router;