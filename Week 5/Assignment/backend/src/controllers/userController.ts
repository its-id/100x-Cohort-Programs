import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import { createUserSchema, loginUserSchema } from '../types';

const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email, role } = req.body;

    const parsedPayload = createUserSchema.safeParse({
      username,
      password,
      email,
      role,
    });

    if (!parsedPayload.success)
      return res.status(411).json({ error: parsedPayload.error });

    const user = await User.findOne({ email });
    if (user) return res.status(409).json({ error: 'User already exists' });

    const hashedPasword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPasword,
      email,
      role,
    });

    await newUser.save();
    return res.status(201).json({
      message: 'User created Successfully',
    });
  } catch (err) {
    return res.status(500).json({ error: 'Some error occurred!' });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const parsedPayload = loginUserSchema.safeParse({
      email,
      password,
    });

    if (!parsedPayload.success) {
      res.status(411).json({ error: parsedPayload.error });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const passwordValidates = await bcrypt.compare(
      password,
      user.password as string
    );

    if (!passwordValidates) {
      res.status(401).json({ error: 'Wrong username/password' });
      return;
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return res
      .status(200)
      .json({ token, role: user.role, message: 'Logged in successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Some error occurred!' });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json({ email: user.email, role: user.role });
  } catch (err) {
    console.log('getUser() err', err);
    res.status(500).json({ error: 'Some error occurred!' });
  }
};

export { createUser, loginUser, getUser };
