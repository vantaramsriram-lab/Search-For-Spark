import 'dotenv/config';
import { app } from './app.js';
import { storageMode } from './services/store.js';

const PORT = process.env.PORT || 8787;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[spark-api] listening on :${PORT} — storage: ${storageMode}`);
});
