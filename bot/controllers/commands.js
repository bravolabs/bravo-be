import express from 'express';

const router = express.Router();

router.all('/commands', async (req, res) => {
  res.send('hiiii');
});

export default router;