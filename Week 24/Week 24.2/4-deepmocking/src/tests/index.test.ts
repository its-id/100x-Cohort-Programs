import request from 'supertest';
import { describe, expect, it, vi } from 'vitest';
import { app } from '../index';

vi.mock('../db'); //since we are using mockDeep, we don't need to pass any object to the mock function

describe('POST /sum', () => {
  it('should return the sum of two numbers', async () => {
    const res = await request(app).post('/sum').send({
      a: 1,
      b: 2,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it('should return 411 if no inputs are provided', async () => {
    const res = await request(app).post('/sum').send({});
    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe('Incorrect inputs');
  });
});

describe('GET /sum', () => {
  it('should return the sum of two numbers', async () => {
    const res = await request(app)
      .get('/sum')
      .set({
        a: '1',
        b: '2',
      })
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it('should return 411 if no inputs are provided', async () => {
    const res = await request(app).get('/sum').send();
    expect(res.statusCode).toBe(411);
  });
});
