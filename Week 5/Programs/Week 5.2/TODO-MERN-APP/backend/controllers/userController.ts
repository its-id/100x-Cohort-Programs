import User from '../models/user';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User Routes
const userSignup = async (req: Request, res: Response) => {
  // Implemented user signup logic
  const { username, password } = req.body;

  //checking if username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.status(400).json({ message: 'Username already exists' });
    return;
  } else {
    //hashing the password, so it can be stored in mongoDB
    const hashedPassword = await bcrypt.hash(password, 10);
    //creating the user
    await User.create({ username, password: hashedPassword });
    res.status(200).json({ message: 'User created successfully' });
  }
};

const userSignin = async (req: Request, res: Response) => {
  // Implemented user signin logic
  const { username, password } = req.body;

  //checking if username already exists
  const user = await User.findOne({ username });
  if (!user)
    return res.status(401).json({ message: 'Wrong username or password' });
  else {
    //checking if password is correct
    const passwordValidates = await bcrypt.compare(
      password,
      user.password as string
    );

    if (passwordValidates) {
      const token = jwt.sign({ username }, process.env.JWT_SECRET as string);
      res.status(200).json({ token });
    } else
      return res.status(401).json({ message: 'Wrong username or password' });
  }
};

export { userSignup, userSignin };
