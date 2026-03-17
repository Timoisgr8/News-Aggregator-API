const logger = require('../utils/logger.js');
const { up } = require('./migrations/001_create_articles.js')

const run = async () => {
    try {
        await up();
        logger.info("Migration success");
        process.exit(0);
    } catch (err) {
        logger.error("Migration failed", err);
        process.exit(1);
    }
};

run();
