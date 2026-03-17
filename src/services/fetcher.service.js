const newsapi = require('../integrations/newsapi');
const hackernews = require('../integrations/hackernews');
const normaliser = require('../utils/normaliser');
const Article = require('../db/models/article')
const logger = require('../utils/logger')

async function fetchFromSources() {
    const [newsApiArticles, hackerNewsArticles] = await Promise.all([
        newsapi.fetchArticles(),
        hackernews.fetchArticles()
    ]);

    const normalisedNewsApiArticles = newsApiArticles.map(a => normaliser.fromNewsApi(a, null));
    const normalisedHackerNewsArticles = hackerNewsArticles.map(a => normaliser.fromHackerNews(a, null));

    const [savedNewsApi, savedHackerNews] = await Promise.all([
        Article.insertMany(normalisedNewsApiArticles),
        Article.insertMany(normalisedHackerNewsArticles)
    ]);

    const count = savedNewsApi.length + savedHackerNews.length;
    logger.info(`Fetched and saved ${count} articles.`)

    return count;
}

module.exports = { fetchFromSources };