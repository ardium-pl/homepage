import type { NextFunction, Request, Response } from 'express';

const requests = new Map<string, number[]>();

export function rateLimit(maxRequests = 5, windowMs = 15 * 60 * 1000) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const key = req.ip ?? 'unknown';
    const now = Date.now();
    const timestamps = (requests.get(key) ?? []).filter(timestamp => now - timestamp < windowMs);

    if (timestamps.length >= maxRequests) {
      res.status(429).json({ error: 'Too many requests. Try again later.' });
      return;
    }

    timestamps.push(now);
    requests.set(key, timestamps);
    next();
  };
}
