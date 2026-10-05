import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '../data');
const FILE = path.join(DATA_DIR, 'applications.json');

/**
 * Dev / no-credentials fallback store.
 * Mirrors the Google Sheets adapter interface so the rest of the
 * backend doesn't care where rows land.
 */
class LocalStore {
  constructor() {
    this.rows = [];
    this.keys = new Set();
    this._load();
  }

  _load() {
    try {
      if (fs.existsSync(FILE)) {
        const parsed = JSON.parse(fs.readFileSync(FILE, 'utf8'));
        this.rows = Array.isArray(parsed.rows) ? parsed.rows : [];
        for (const r of this.rows) this.keys.add(this._key(r.email, r.scholar));
      }
    } catch {
      this.rows = [];
    }
  }

  _key(email, scholar) {
    return `${String(email).toLowerCase()}|${String(scholar).toUpperCase()}`;
  }

  _persist() {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const tmp = `${FILE}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify({ rows: this.rows }, null, 2));
    fs.renameSync(tmp, FILE);
  }

  async isDuplicate(email, scholar) {
    const k = this._key(email, scholar);
    // also catch "same scholar OR same email" — either identifier is unique
    const emailK = String(email).toLowerCase();
    const scholarK = String(scholar).toUpperCase();
    return (
      this.keys.has(k) ||
      this.rows.some((r) => r.email === emailK || r.scholar === scholarK)
    );
  }

  async append(row) {
    this.rows.push(row);
    this.keys.add(this._key(row.email, row.scholar));
    this._persist();
    return { success: true };
  }
}

export const localStore = new LocalStore();
