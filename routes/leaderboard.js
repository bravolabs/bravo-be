const express = require('express');
const service = require('../services/wallet');
const auth = require('./utils/auth');

const router = express.Router();
router.use('/', auth.authenticate);
