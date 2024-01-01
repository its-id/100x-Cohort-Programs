import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const decoded: jwt.JwtPayload | string = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    if (!decoded) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    req.body.email = (decoded as jwt.JwtPayload).email;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

export default userMiddleware;
