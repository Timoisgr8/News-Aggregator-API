const fetcher = require('../../services/fetcher.service')

async function fetchFromSources(req, res, next) {
    try {
        const count = await fetcher.fetchFromSources();

        return res.status(200).json({
            message: `Fetched ${count} articles.`
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { fetchFromSources }