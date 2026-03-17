const axios = require('axios');
const config = require('../config/index')

async function fetchArticles(category) {

    const url = `${config.newsapi.baseUrl}/top-headlines`;

    const response = await axios.get(url, {
        params: {
            apiKey: config.newsapi.key,
            category: category || undefined
        }
    })

    return response.data.articles;
}

module.exports = { fetchArticles }