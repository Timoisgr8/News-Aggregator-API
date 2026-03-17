function fromHackerNews(article, category) {
    const normalisedArticle = {
        title: article.title,
        summary: null,
        url: article.url,
        source: "hackernews",
        category: category,
        published_at: new Date(article.time * 1000),
    }

    return normalisedArticle
}

function fromNewsApi(article, category) {
    const normalisedArticle = {
        title: article.title,
        summary: article.description,
        url: article.url,
        source: "newsapi",
        category: category,
        published_at: article.publishedAt,
    }

    return normalisedArticle
}

module.exports = {fromHackerNews, fromNewsApi};