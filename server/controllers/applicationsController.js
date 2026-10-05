import { store, storageMode } from '../services/store.js';
import { validateApplication } from '../utils/validate.js';
import { generateApplicationId } from '../utils/id.js';
import { DOMAIN_NAMES } from '../utils/constants.js';

export async function createApplication(req, res) {
  const { errors, clean } = validateApplication(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({ errors });
  }

  try {
    const duplicate = await store.isDuplicate(clean.email, clean.scholar);
    if (duplicate) {
      return res.status(409).json({
        error: 'An application has already been submitted using these details.',
      });
    }

    const applicationId = generateApplicationId();
    const timestamp = new Date().toISOString();

    const result = await store.append({
      applicationId,
      timestamp,
      email: clean.email,
      name: clean.name,
      scholar: clean.scholar,
      branch: clean.branch,
      whatsapp: clean.whatsapp,
      domain1: DOMAIN_NAMES[clean.domains[0]] || '',
      domain2: DOMAIN_NAMES[clean.domains[1]] || '',
      link: clean.link,
      interest: clean.interest,
    });

    // Apps Script re-checks the identifiers while holding a lock so two
    // simultaneous submissions cannot create duplicate rows.
    if (result?.duplicate) {
      return res.status(409).json({
        error: 'An application has already been submitted using these details.',
      });
    }

    return res.status(201).json({ applicationId, message: 'Application received.', storage: storageMode });
  } catch (err) {
    console.error('[applications] storage failure:', err?.message || err);
    return res.status(500).json({ error: 'Something went wrong on our end. Try again in a minute.' });
  }
}

export async function health(req, res) {
  res.json({ ok: true, service: 'spark-api', storage: storageMode });
}
