const axios = require('axios');
const config = require('../config/index');
const logger = require('../utils/logger');

async function fetchArticles(category) {
    const url = `${config.newsapi.baseUrl}/top-headlines`;

    try {
        const response = await axios.get(url, {
            params: {
                apiKey: config.newsapi.key,
                country: 'us',
                category: category || undefined
            }
        });
        return response.data.articles;
    } catch (err) {
        logger.error('NewsAPI request failed', {
            status: err.response?.status,
            message: err.response?.data?.message,
            code: err.response?.data?.code,
            apiKey: config.newsapi.key ? 'set' : 'not set'
        });
        throw err;
    }
}

module.exports = { fetchArticles };