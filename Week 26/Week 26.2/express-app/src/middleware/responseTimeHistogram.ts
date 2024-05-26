import { NextFunction, Request, Response } from 'express';
import client from 'prom-client';

// Create a histogram metric
const responseTimeHistogram = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 5, 1, 2, 5, 100, 300, 500],
});

export const responseTimeDistribution = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const endTime = Date.now();
    const duration = endTime - startTime;

    responseTimeHistogram.observe(
      {
        method: req.method,
        route: req.route ? req.route.path : req.path,
        code: res.statusCode,
      },
      duration
    );
  });

  next();
};
