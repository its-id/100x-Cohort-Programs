import { Hono } from 'hono';

const app = new Hono();

// STEP 1: GET THE REQUEST
app.get('/', async (c: any) => {
  console.log(c.req.header('Authorization'));
  console.log(c.req.query('param'));

  return c.html(
    `<h1>Hi 👋, Everyone!</h1> <p> Response sent from Hono (compatible with wrangler cli for cloudflare workers)! </p>`
  );
});

// STEP 2: APPLYING MIDDLEWARES

/*
async function authMiddleware(c: any, next: any) {
  if (c.req.header('Authorization')) {
    // Do validation
    await next();
  } else {
    return c.text('You dont have acces');
  }
}

// EITHER
// app.use(authMiddleware);

// OR
app.post('/', authMiddleware, async (c) => {
  // const body = await c.req.parseBody();
  const body = await c.req.json();
  console.log(body);
  console.log(c.req.header('Authorization'));
  console.log(c.req.query('param'));

  return c.json({ msg: `Hello ${body.name}` });
});
*/

export default app;
