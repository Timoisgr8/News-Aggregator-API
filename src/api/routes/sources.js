const express = require('express');
const sourcesController = require('../controllers/source.controller');

const router = express.Router();

router.get('/', sourcesController.getSources);

module.exports = router;
