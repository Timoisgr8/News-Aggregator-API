const redis = require('redis');
const config = require('../config');
const logger = require('../utils/logger');

const client = redis.createClient({
    url: config.redis.url
});

if (process.env.NODE_ENV !== 'test') {
    client.connect().catch(err => {
        logger.warn('Redis connection failed', { error: err.message });
    });
}

async function get(key) {
    const val = await client.get(key);
    if (val == null)
        return null;

    return JSON.parse(val);
}


async function set(key, val) {
    return await client.set(key, JSON.stringify(val), { EX: config.redis.ttl });
}


async function del(key) {
    return await client.del(key);
}

module.exports = { get, set, del }