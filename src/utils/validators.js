import { BRANCHES, DOMAINS, MAX_DOMAINS } from './constants';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SCHOLAR_RE = /^[A-Za-z0-9]{6,20}$/;
const URL_RE = /^https?:\/\/\S+\.\S{2,}$/i;

export function cleanDigits(value) {
  return String(value || '')
    .replace(/[\s()+\-\.]/g, '')
    .replace(/^00/, '');
}

export function validateIdentity(fields) {
  const errors = {};
  const name = (fields.name || '').trim();
  const scholar = (fields.scholar || '').trim();
  const whatsapp = (fields.whatsapp || '').trim();
  const email = (fields.email || '').trim();

  if (!name) errors.name = 'Required.';
  else if (name.length < 2 || name.length > 80) errors.name = 'Enter your full name (2–80 characters).';

  if (!scholar) errors.scholar = 'Required.';
  else if (!SCHOLAR_RE.test(scholar)) errors.scholar = 'Scholar numbers are 6–20 letters/digits, no spaces.';

  if (!whatsapp) errors.whatsapp = 'Required.';
  else {
    const digits = cleanDigits(whatsapp);
    const local = digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits;
    if (!/^[0-9]{10,15}$/.test(digits)) errors.whatsapp = 'Enter a valid phone number (10–15 digits).';
    else if (digits.length === 10 && !/^[6-9]/.test(local)) errors.whatsapp = 'Enter a valid 10-digit mobile number.';
  }

  if (!email) errors.email = 'Required.';
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.';

  return errors;
}

export function validateAcademics(fields) {
  const errors = {};
  if (!fields.branch) errors.branch = 'Select your branch.';
  else if (!BRANCHES.includes(fields.branch)) errors.branch = 'Unknown branch.';
  return errors;
}

export function validateDomains(selected) {
  const errors = {};
  if (!selected || selected.length === 0) errors.domains = 'Pick at least one domain.';
  else if (selected.length > MAX_DOMAINS) errors.domains = `You can choose up to ${MAX_DOMAINS} domains.`;
  else {
    const ids = DOMAINS.map((d) => d.id);
    if (selected.some((s) => !ids.includes(s))) errors.domains = 'Unknown domain.';
  }
  return errors;
}

export function validateExperience(fields) {
  const errors = {};
  const link = (fields.link || '').trim();
  const interest = (fields.interest || '').trim();

  if (link) {
    if (link.length > 300) errors.link = 'That link is too long.';
    else if (!URL_RE.test(link)) errors.link = 'Links must start with http:// or https://';
  }
  if (!interest) errors.interest = 'Required.';
  else if (interest.length < 10) errors.interest = 'Give us a little more — a few honest sentences.';
  else if (interest.length > 2000) errors.interest = 'Keep it under 2000 characters.';

  return errors;
}
