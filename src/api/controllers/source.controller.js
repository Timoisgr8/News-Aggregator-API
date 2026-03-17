async function getSources(req, res, next) {

    return res.status(200).json({
        sources: ["newsapi", "hackernews"]
    });
}

module.exports = { getSources }