const cache = require('./cache.service');
const Article = require('../db/models/article');
const logger = require('../utils/logger');

async function getArticles({ page, limit, offset, category }) {

    const cacheKey = `articles:${category}:page:${page}:limit:${limit}`;

    try {
        const cached = await cache.get(cacheKey);
        if (cached) return cached;
    } catch {
        logger.warn('Cache get failed, falling through to DB', { cacheKey });
    }

    const [articles, total] = await Promise.all([
        Article.findAll({ limit, offset, category }),
        Article.countAll({ category })
    ]);

    try {
        await cache.set(cacheKey, { articles, total });
    } catch (err) {
        logger.warn('Cache set failed', { error: err.message });
    }

    return { articles, total };
}

async function getArticleById(id) {

    const cacheKey = `articles:id:${id}`;

    try {
        const cached = await cache.get(cacheKey);
        if (cached) return cached;
    } catch {
        logger.warn('Cache get failed, falling through to DB', { cacheKey });
    }

    const article = await Article.findById(id);
    if (article) {
        try {
            await cache.set(cacheKey, article);
        } catch (err) {
            logger.warn('Cache set failed', { error: err.message });
        }
    }
    return article;
}


module.exports = { getArticles, getArticleById }