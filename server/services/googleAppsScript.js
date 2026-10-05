const GOOGLE_APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL;

function assertConfigured() {
  if (!GOOGLE_APPS_SCRIPT_URL) {
    throw new Error('GOOGLE_APPS_SCRIPT_URL is not configured');
  }
}

async function postToAppsScript(payload) {
  assertConfigured();

  const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Google Apps Script returned HTTP ${response.status}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || 'Google Apps Script failed');
  }

  return result;
}

export function isConfigured() {
  return Boolean(GOOGLE_APPS_SCRIPT_URL);
}

export const appsScriptStore = {
  async isDuplicate(email, scholar) {
    const result = await postToAppsScript({
      action: 'checkDuplicate',
      email,
      scholar,
    });

    return Boolean(result.duplicate);
  },

  async append(row) {
    return postToAppsScript({
      action: 'append',
      application: row,
    });
  },
};
