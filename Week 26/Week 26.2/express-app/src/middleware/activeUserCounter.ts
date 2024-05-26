import { NextFunction, Request, Response } from 'express';
import client from 'prom-client';

const activeUserGauge = new client.Gauge({
  name: 'active_users',
  help: "Total number of users whose request hasn't yet resolved",
  labelNames: ['method', 'route'],
});

export const userCount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  activeUserGauge.inc();

  res.on('finish', () => {
    activeUserGauge.dec(); //Decreasing the user on requests finish
  });

  next();
};
