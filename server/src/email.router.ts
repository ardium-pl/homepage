import express, { type Request, type Response } from 'express';
import { EmailService, EmailValidationError } from './email.service.js';
import { rateLimit } from './rate-limit.js';

const router = express.Router();
const emailService = new EmailService();

router.post('/api/send-email', rateLimit(), async (req: Request, res: Response): Promise<void> => {
  try {
    await emailService.send(req.body);
    res.sendStatus(204);
  } catch (error: unknown) {
    if (error instanceof EmailValidationError) {
      res.status(400).json({ error: error.message });
      return;
    }

    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
