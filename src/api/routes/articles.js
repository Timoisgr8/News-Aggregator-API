const express = require('express');
const articleController = require('../controllers/article.controller.js')
const validateQuery = require('../middleware/validateQuery');

const router = express.Router();

router.get('/', validateQuery, articleController.getArticles);

router.get('/:id', articleController.getArticleById);

module.exports = router;