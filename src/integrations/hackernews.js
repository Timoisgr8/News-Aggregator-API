const axios = require('axios');
const config = require('../config/index')

async function fetchArticles() {
    const idsUrl = `${config.hackernews.baseUrl}/topstories.json`;
    const response = await axios.get(idsUrl);

    const ids = response.data.slice(0, 20);

    const articleResponse = await Promise.all(ids.map(id => axios.get(`${config.hackernews.baseUrl}/item/${id}.json`)));
    return articleResponse.map(res => res.data);
}

module.exports = { fetchArticles }