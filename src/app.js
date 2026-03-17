const express = require('express');
const config = require('./config');
const logger = require('./utils/logger');
const requestLogger = require('./api/middleware/requestLogger');
const errorHandler = require('./api/middleware/errorHandler');

const sourceRoutes = require('./api/routes/sources');
const healthRoutes = require('./api/routes/health');
const articleRoutes = require('./api/routes/articles');
const articleRoutes = require('./api/routes/fetch');

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use('/health', healthRoutes);
app.use('/articles', articleRoutes);
app.use('/sources', sourceRoutes);
app.use('/fetch', fetchRoutes);


// Error 404 
app.use((req, res) => {
    res.status(404).json({
        error: {
            message: `Route ${req.originalUrl} not found`
            , status: 404
        },
    });
});

app.use(errorHandler);


if (require.main === module) {
    app.listen(config.app.port, () => {
        logger.info('Server started', {
            port: config.app.port,
            env: config.app.env,
        });
    });
}

module.exports = app;