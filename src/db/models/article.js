const db = require('../index')

async function findById(id) {
    const result = await db.query('SELECT * FROM articles WHERE id = $1;', [id]);

    return result.rows[0] || null;
}

async function findAll(limit, offset, category) {
    const params = [parseInt(limit), parseInt(offset)];
    let whereClause = '';

    if (category !== null) {
        params.push(category);
        whereClause = `WHERE category = $${params.length}`;
    }

    const query = `
    SELECT * FROM articles
    ${whereClause}
    ORDER BY published_at DESC
    LIMIT $1 OFFSET $2
    `;

    const result = await db.query(query, params);

    return result.rows || null;
}


async function countAll(category) {
    let whereClause = '';
    const params = [];

    if (category !== null) {
        params.push(category);
        whereClause = `WHERE category = $${params.length}`;
    }

    const query = `
    SELECT COUNT(*) FROM articles
    ${whereClause}
    `;

    const result = await db.query(query, params);

    return parseInt(result.rows[0].count);
}


async function insertMany(articles) {
    const params = [];

    if (articles.length === 0) return [];

    const values = articles.map((a, i) => {
        const base = i * 5;
        params.push(a.title, a.summary, a.url, a.source, a.category);
        return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5})`;
    });

    const valueClause = values.join(',\n');

    const query = `
        INSERT INTO articles (title, summary, url, source, category)
        VALUES ${valueClause}
        ON CONFLICT (url) DO NOTHING
        RETURNING *
    `;

    const result = await db.query(query, params);

    return result.rows;
}

module.exports = { findById, findAll, countAll, insertMany }