const db = require('../index');

const up = async () => {
    await db.query(`
    CREATE TABLE IF NOT EXISTS articles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255),
        summary TEXT,
        url TEXT UNIQUE,
        source VARCHAR(50),
        category VARCHAR(255),
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
    );


    CREATE INDEX IF NOT EXISTS idx_articles_category
        ON articles(category);

    CREATE INDEX IF NOT EXISTS idx_articles_published_at
        ON articles(published_at DESC);
  `);
};

module.exports = { up };