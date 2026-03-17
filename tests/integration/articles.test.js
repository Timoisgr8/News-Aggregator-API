const request = require('supertest');
const app = require('../../src/app');

jest.mock('../../src/db/models/article');
jest.mock('../../src/services/cache.service');


describe('GET /articles', () => {
    let Article;

    beforeEach(() => {
        Article = require('../../src/db/models/article');
        Article.findAll.mockResolvedValue([
            { id: '123', title: 'Test article', category: 'tech' }
        ]);
        Article.countAll.mockResolvedValue(1);
    });


    it('returns 200', async () => {
        const res = await request(app).get('/articles');
        expect(res.status).toBe(200);
    });

    it('returns correct shape', async () => {
        const res = await request(app).get('/articles');
        expect(res.body).toHaveProperty('articles');
        expect(res.body).toHaveProperty('meta');
    });

    it('returns 400 for invalid page', async () => {
        const res = await request(app).get('/articles?page=abc');
        expect(res.status).toBe(400);
    });
});

describe('GET /articles/:id', () => {
    it('returns 404 when article not found', async () => {
        const Article = require('../../src/db/models/article');
        Article.findById.mockResolvedValue(null);

        const res = await request(app).get('/articles/non-existent-id');
        expect(res.status).toBe(404);
    });

    it('returns 200 with article when found', async () => {
        const Article = require('../../src/db/models/article');
        Article.findById.mockResolvedValue(
            { id: '123', title: 'Test article', category: 'tech' }
        );

        const res = await request(app).get('/articles/123');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('article');
        expect(res.body.article.id).toBe('123');
        expect(res.body.article.title).toBe('Test article');
    });
});