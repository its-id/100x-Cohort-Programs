/*
//Simple Vitest Example
import { expect, test } from 'vitest';

test('true === true', () => {
  expect(true).toBe(true);
});
*/

import { describe, expect, test, it } from 'vitest';
import request from 'supertest';
import { app } from '../index';

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
