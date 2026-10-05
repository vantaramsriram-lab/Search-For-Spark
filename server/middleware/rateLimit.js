import rateLimit from 'express-rate-limit';

/** Soft throttle on submissions — enough to stop script-spam, invisible to humans. */
export const applicationLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 25,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts. Slow down and try again shortly.' },
});
