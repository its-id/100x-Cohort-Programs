import express from 'express';
import { z } from 'zod';

export const appWithZod = express();
appWithZod.use(express.json());

const sumInput = z.object({
  a: z.number(),
  b: z.number(),
});

//Scenario 1: here we get the inputs from the body
appWithZod.post('/sum', (req, res) => {

  //do validation using zod and get the parsed response
  const parsedResponse = sumInput.safeParse(req.body);

  //if the zod validation fails, return a 411 status code
  if (!parsedResponse.success) {
    return res.status(411).json({
      message: 'Incorrect inputs',
    });
  }

  //if the zod validation passes, return the sum of a and b
  const answer = parsedResponse.data.a + parsedResponse.data.b;

  res.json({
    answer,
  });
});

//Scenario 2: here we get the inputs from the headers
appWithZod.get('/sum', (req, res) => {

  //do validation using zod and get the parsed response
  const parsedResponse = sumInput.safeParse({
    a: Number(req.headers['a']),
    b: Number(req.headers['b']),
  });

  if (!parsedResponse.success) {
    return res.status(411).json({
      message: 'Incorrect inputs',
    });
  }

  const answer = parsedResponse.data.a + parsedResponse.data.b;

  res.json({
    answer,
  });
});
