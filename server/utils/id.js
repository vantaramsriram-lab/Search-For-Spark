import crypto from 'node:crypto';

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no ambiguous glyphs

export function generateApplicationId() {
  const bytes = crypto.randomBytes(6);
  let id = 'SPK-';
  for (const b of bytes) id += ALPHABET[b % ALPHABET.length];
  return id;
}
