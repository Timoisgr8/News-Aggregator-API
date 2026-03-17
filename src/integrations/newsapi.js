const axios = require('axios');
const config = require('../config/index');
const logger = require('../utils/logger');

async function fetchArticles(category) {
    const url = `${config.newsapi.baseUrl}/top-headlines`;

    const response = await axios.get(url, {
        params: {
            apiKey: config.newsapi.key,
            country: 'us',
            category: category || undefined
        }
    });

    return response.data.articles;
}

module.exports = { fetchArticles };