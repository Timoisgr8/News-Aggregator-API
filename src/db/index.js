const { Pool } = require('pg');
const config = require('../config/index')
const logger = require('../utils/logger')

const pool = new Pool({
    host: config.db.host,
    port: config.db.port,
    database: config.db.name,
    user: config.db.user,
    password: config.db.password,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
    maxLifetimeSeconds: 60,
});

pool.on('error', (err) => {
    logger.error('Unexpected database error', { error: err.message });
});

const query = (text, params) => pool.query(text, params);

module.exports = { query };