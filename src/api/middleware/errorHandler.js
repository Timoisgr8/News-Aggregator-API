const logger = require('../../utils/logger');

const errorHandler = (err, req, res, next) => {

    logger.error('Error', {
        method: req.method,
        route: req.originalUrl,
        err
    });


    const status = err.status || 500;
    const message = status === 500 ? 'Internal server error' : err.message;

    res.status(status).json({
        error: { message, status }
    });
};

module.exports = errorHandler;