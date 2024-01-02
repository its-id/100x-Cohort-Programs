import User from '../models/user';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validate } from 'deep-email-validator';

const isEmailValid = async (email: string) => {
  return await validate(email);
};

// User Routes
const userSignup = async (req: Request, res: Response) => {
  // Implemented user signup logic
  const { email, username, password } = req.body;

  //checking if email already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({ error: 'Email already exists' });
    return;
  }

  //checking if email is valid
  const { valid } = await isEmailValid(email);
  if (!valid) {
    res.status(400).json({ error: 'Invalid email' });
    return;
  }

  if (password.length < 6) {
    res.status(400).json({ error: 'Password must be at least 6 characters' });
    return;
  }

  //hashing the password, so it can be stored in mongoDB
  const hashedPassword = await bcrypt.hash(password, 10);
  //creating the user
  await User.create({ email, username, password: hashedPassword });
  res.status(200).json({ message: 'User created successfully' });
};

const userSignin = async (req: Request, res: Response) => {
  // Implemented user signin logic
  const { email, password } = req.body;

  //checking if email already exists
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Wrong email or password' });
  else {
    //checking if password is correct
    const passwordValidates = await bcrypt.compare(
      password,
      user.password as string
    );

    if (passwordValidates) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET as string);
      res.status(200).json({ token });
    } else return res.status(401).json({ error: 'Wrong email or password' });
  }
};

const getUser = async (req: Request, res: Response) => {
  // console.log(req.body);
  if (req.body.email) {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(200)
        .json({ email: req.body.email, username: user.username });
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
  return res.status(401).json({ error: 'Unauthorized' });
};

export { userSignup, userSignin, getUser };
