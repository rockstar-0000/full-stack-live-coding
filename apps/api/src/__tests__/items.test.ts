import request from 'supertest';
import app from '../app';

// Mock Prisma so tests run without a real database
jest.mock('../lib/prisma', () => ({
  prisma: {
    item: {
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn().mockResolvedValue(null),
      create: jest.fn().mockResolvedValue({
        id: 1,
        title: 'Test Item',
        description: null,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    },
  },
}));

describe('GET /api/v1/health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });
});

describe('GET /api/v1/items', () => {
  it('returns 200 with an items array', async () => {
    const res = await request(app).get('/api/v1/items');
    expect(res.status).toBe(200);
    expect(res.body.data).toBeInstanceOf(Array);
  });
});

describe('POST /api/v1/items', () => {
  it('returns 400 when body is missing title', async () => {
    const res = await request(app).post('/api/v1/items').send({});
    expect(res.status).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  it('returns 201 and the created item with a valid body', async () => {
    const res = await request(app).post('/api/v1/items').send({ title: 'Test Item' });
    expect(res.status).toBe(201);
    expect(res.body.data.title).toBe('Test Item');
  });
});
