const articleService = require('../../services/articles.service');

async function getArticles(req, res, next) {
    const { page, limit, offset } = req.pagination;
    const { category } = req.filters;


    try {
        const { articles, total } = await articleService.getArticles({ page, limit, offset, category });

        return res.status(200).json({
            articles,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (err) {
        next(err);
    }
}

async function getArticleById(req, res, next) {
    const { id } = req.params;

    try {
        const article = await articleService.getArticleById(id);

        if (article == null) {
            return res.status(404).json({
                error: { message: 'Article not found', status: 404 }
            });
        }
        return res.status(200).json({
            article
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { getArticles, getArticleById }