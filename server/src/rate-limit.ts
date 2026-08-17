import type { NextFunction, Request, Response } from 'express';

export function rateLimit(maxRequests = 5, windowMs = 15 * 60 * 1000) {
  const requests = new Map<string, number[]>();
  let lastCleanup = 0;

  return (req: Request, res: Response, next: NextFunction): void => {
    const now = Date.now();

    if (now - lastCleanup > windowMs) {
      for (const [existingKey, existingTimestamps] of requests) {
        const active = existingTimestamps.filter(timestamp => now - timestamp < windowMs);
        if (active.length) requests.set(existingKey, active);
        else requests.delete(existingKey);
      }
      lastCleanup = now;
    }

    const key = req.ip ?? req.socket.remoteAddress ?? 'unknown';
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
