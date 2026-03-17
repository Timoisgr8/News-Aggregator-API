const request = require('supertest');
const app = require('../../src/app');

describe('GET /health', () => {
    it('returns 200', async () => {
        const res = await request(app).get('/health');
        expect(res.status).toBe(200);
    });

    it('returns correct shape', async () => {
        const res = await request(app).get('/health');
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('timestamp');
        expect(res.body).toHaveProperty('uptime');
    });
});