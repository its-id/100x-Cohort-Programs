import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRouter from './routes/todo';
import userRouter from './routes/user';

dotenv.config();

const app = express();
const port = 3001;
mongoose.connect(process.env.DB_URL as string);

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/todos', todoRouter);
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
