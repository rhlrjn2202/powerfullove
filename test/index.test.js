const request = require('supertest');
const app = require('../index');

describe('API Endpoints', () => {
  test('GET /health returns ok status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  test('GET /api/hello returns correct message', async () => {
    const response = await request(app).get('/api/hello');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Hello from Node.js!');
  });
});