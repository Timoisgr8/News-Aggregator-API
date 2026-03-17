const express = require('express');
const fetchController = require('../controllers/fetch.controller');

const router = express.Router();

router.post('/', fetchController.fetchFromSources);

module.exports = router;
