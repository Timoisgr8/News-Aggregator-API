const { createLogger, format, transports } = require('winston');
const config = require('../config');

const isDev = config.app.env === 'development';

const logger = createLogger({
  level: 'info',
  format: isDev
    ? format.combine(format.colorize(), format.simple())
    : format.combine(format.timestamp(), format.json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/combined.log' }),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

module.exports = logger;