const fetcher = require('../../services/fetcher.service')
const logger = require('../../utils/logger')

async function fetchFromSources(req, res, next) {
    try {
        const count = await fetcher.fetchFromSources();
        return res.status(200).json({
            message: `Fetched ${count} articles.`
        });
    } catch (err) {
        logger.error('Fetch failed', { 
            error: err.message,
            response: err.response?.data  // shows NewsAPI's actual error message
        });
        next(err);
    }
}

module.exports = { fetchFromSources }