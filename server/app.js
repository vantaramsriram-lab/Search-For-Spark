import express from 'express';
import helmet from 'helmet';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import applicationsRouter from './routes/applications.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, '../dist');

export const app = express();

app.disable('x-powered-by');
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        // allow the site to be embedded by the preview proxy / any https host
        'frame-ancestors': ["'self'", 'https:'],
      },
    },
  })
);
app.set('trust proxy', 1);
app.use(express.json({ limit: '20kb' }));

// API — credentials never leave the server
app.use('/api', applicationsRouter);

// Static client (production / Render). Skipped in dev (Vite serves + proxies /api).
if (fs.existsSync(DIST)) {
  app.use(express.static(DIST, { index: 'index.html' }));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(DIST, 'index.html'));
  });
}
