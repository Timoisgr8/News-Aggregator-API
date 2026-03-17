const logger = require('../../utils/logger');

const requestLogger = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const status = res.statusCode;

        logger.info('Request handled', {
            method: req.method,
            route: req.originalUrl,
            status,
            duration,
        });
    });

    next();
};

module.exports = requestLogger;