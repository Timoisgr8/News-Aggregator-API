const fetcher = require('../../services/fetcher.service')

async function fetchFromSources(req, res, next) {
    count = await fetcher.fetchFromSources()

    return res.status(200).json({
        message: `Fetched ${count} articles.`
    });
}

module.exports = { fetchFromSources }