import { describe, expect, it } from '@jest/globals';
import request from 'supertest';
import { appWithZod } from '../indexWithZod';

//Testing the cases when we send the data in body
describe('POST /sum', () => {
  it('should return the sum of two numbers', async () => {
    //Testing src/indexWithZod.ts: we simulate a post request to the /sum endpoint
    const res = await request(appWithZod).post('/sum').send({
      a: 1,
      b: 2,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  //Testing if the zod validation fails
  it('should return 411 if no inputs are provided', async () => {
    const res = await request(appWithZod).post('/sum').send({}); //sending nothing in th ebody
    expect(res.statusCode).toBe(411);
    expect(res.body.message).toBe('Incorrect inputs');
  });
});

//Testing the cases when we send the data in headers
describe('GET /sum', () => {
  it('should return the sum of two numbers', async () => {
    const res = await request(appWithZod)
      .get('/sum')
      .set({
        //setting headers
        a: '1',
        b: '2',
      })
      .send();
    expect(res.statusCode).toBe(200);
    expect(res.body.answer).toBe(3);
  });

  it('should return 411 if no inputs are provided', async () => {
    const res = await request(appWithZod).get('/sum').send();
    expect(res.statusCode).toBe(411);
  });
});
