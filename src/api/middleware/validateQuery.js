const validateQuery = (req, res, next) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 20;
    const category = req.query.category;

    if (isNaN(page) || page < 1) {
        return res.status(400).json({ error: { message: 'page must be a positive integer', status: 400 } });
    }
    if (isNaN(limit) || limit < 1 || limit > 100) {
        return res.status(400).json({ error: { message: 'limit must be between 1 and 100', status: 400 } });
    }

    req.pagination = { page, limit, offset: (page - 1) * limit };
    req.filters = { category: category || null };

    next();
};

module.exports = validateQuery;