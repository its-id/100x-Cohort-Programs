import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'Auth Header Not Authorized' });
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Token Not Authorized' });
      return;
    }

    const decoded: jwt.JwtPayload | string = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (!decoded) {
      res.status(401).json({ error: 'Decoded Data not valid' });
      return;
    }

    req.body.username = (decoded as jwt.JwtPayload).username; // adding the username to the request object
    next();
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

export default userMiddleware;
