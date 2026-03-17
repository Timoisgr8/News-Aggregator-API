require("dotenv").config();

const config = {
    app: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        name: process.env.DB_NAME || 'news_aggregator',
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
    },
    redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        ttl: 60 * 15, // 15 minutes in seconds
    },
    newsapi: {
        key: process.env.NEWSAPI_KEY,
        baseUrl: 'https://newsapi.org/v2',
    },
    hackernews: {
        baseUrl: 'https://hacker-news.firebaseio.com/v0',
    }
}

if (!config.newsapi.key && config.app.env !== 'test') {
  console.warn('WARNING: NEWSAPI_KEY is not set');
}

console.log('NEWSAPI_KEY exists:', !!process.env.NEWSAPI_KEY);


module.exports = config;