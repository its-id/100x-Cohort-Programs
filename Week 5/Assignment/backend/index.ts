import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './src/routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
mongoose.connect(process.env.DB_URL as string);

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

//global catches
app.use((err: Error, req: Request, res: Response) => {
  return res.status(500).json({ error: 'Some error occured!' });
});

app.listen(port, () => {
  console.log(`Server is running at PORT:${port}`);
});
