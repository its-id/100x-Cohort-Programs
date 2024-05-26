import { NextFunction, Request, Response } from 'express';
import client from 'prom-client';

// Create a counter metric
const requestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

export const requestCount = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  res.on('finish', () => {
    // Increment request counter
    requestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });
  });

  next();
};
