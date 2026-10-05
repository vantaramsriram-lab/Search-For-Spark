import { BRANCHES, DOMAIN_IDS, MAX_DOMAINS } from './constants.js';
import { cleanString } from './sanitize.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SCHOLAR_RE = /^[A-Za-z0-9]{6,20}$/;
const URL_RE = /^https?:\/\/\S+\.\S{2,}$/i;

/**
 * Server-side validation + sanitization. Never trust the client.
 * Returns { errors, clean } — errors keyed by field.
 */
export function validateApplication(raw) {
  const errors = {};
  const body = raw && typeof raw === 'object' ? raw : {};

  const name = cleanString(body.name, { max: 80 });
  const scholar = cleanString(body.scholar, { max: 20 });
  const whatsapp = cleanString(body.whatsapp, { max: 24 });
  const email = cleanString(body.email, { max: 120 }).toLowerCase();
  const branch = cleanString(body.branch, { max: 20 });
  const link = cleanString(body.link, { collapse: false, max: 300 });
  const interest = cleanString(body.interest, { collapse: false, max: 2000 });

  if (!name || name.length < 2) errors.name = 'Enter your full name.';
  if (!scholar || !SCHOLAR_RE.test(scholar)) errors.scholar = 'Invalid scholar number.';

  const digits = whatsapp.replace(/[^0-9]/g, '');
  if (!whatsapp || !/^[0-9]{10,15}$/.test(digits)) errors.whatsapp = 'Enter a valid phone number.';

  if (!email || !EMAIL_RE.test(email)) errors.email = 'Enter a valid email address.';
  if (!branch || !BRANCHES.includes(branch)) errors.branch = 'Select a valid branch.';

  let domains = Array.isArray(body.domains) ? body.domains.filter((d) => typeof d === 'string') : [];
  domains = [...new Set(domains)].filter((d) => DOMAIN_IDS.includes(d));
  if (domains.length === 0) errors.domains = 'Pick at least one domain.';
  else if (domains.length > MAX_DOMAINS) errors.domains = `You can choose up to ${MAX_DOMAINS} domains.`;

  if (link && !URL_RE.test(link)) errors.link = 'Links must start with http:// or https://';
  if (!interest || interest.length < 10) errors.interest = 'Tell us a little more.';

  const clean = {
    name,
    scholar: scholar.toUpperCase(),
    whatsapp: digits,
    email,
    branch,
    link,
    interest,
    domains,
  };

  return { errors, clean };
}
