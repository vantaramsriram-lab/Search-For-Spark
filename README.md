# SPARK — Search for Spark

Official registration site for the **SPARK Flagship Talent Hunt** (first-year batch).
Programming × Robotics × Technology.

Recruitment campaign site + immersive 4-step application flow. Applications land in a
Google Sheet through a Google Apps Script web app. Local development can use a JSON
store when the Apps Script URL is not configured.

## Stack

- **Frontend:** React 18 + Vite + Tailwind CSS + Framer Motion
- **Backend:** Node.js + Express (ESM)
- **Storage:** Google Apps Script → Google Sheets
- **Development fallback:** local JSON store

## Run locally

```bash
npm install
npm run dev        # Vite (5173, proxies /api) + Express API (8787)
# or production-style:
npm run build
npm start          # serves dist + /api on PORT (default 8787)
```

## Environment

Copy `.env.example` to `.env`.

```env
GOOGLE_APPS_SCRIPT_URL=
PORT=8787
```

`GOOGLE_APPS_SCRIPT_URL` is backend-only. Never prefix it with `VITE_` and never
put it in frontend code.

If the URL is not configured, local development falls back to
`server/data/applications.json`. For production, configure the Apps Script URL;
do not rely on local JSON storage.

## Google Apps Script setup

### 1. Create the spreadsheet

Create a Google Sheet named **SPARK Applications**.

Rename the first tab to:

`Applications`

Put these headers in row 1, in this exact order:

`Application ID · Timestamp · Email · Student Name · Scholar Number · Branch · WhatsApp Number · Domain 1 · Domain 2 · Prior Work Link · Domain Interest`

Keep the spreadsheet private. The Apps Script deployment will write to it.

### 2. Create the Apps Script project

Open Google Apps Script and create a new project, for example:

`SPARK Application Backend`

Replace the default code with:

```js
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
const SHEET_NAME = 'Applications';

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const data = JSON.parse(e.postData.contents || '{}');

    if (data.action === 'checkDuplicate') {
      const sheet = getSheet_();
      const duplicate = findDuplicate_(sheet, data.email, data.scholar);

      return json_({
        success: true,
        duplicate,
      });
    }

    if (data.action === 'append') {
      const application = data.application || {};
      const sheet = getSheet_();

      // Re-check while holding the script lock. This protects against two
      // students submitting the same email/scholar at almost the same time.
      if (findDuplicate_(sheet, application.email, application.scholar)) {
        return json_({
          success: true,
          duplicate: true,
        });
      }

      sheet.appendRow([
        application.applicationId || '',
        application.timestamp || '',
        application.email || '',
        application.name || '',
        application.scholar || '',
        application.branch || '',
        application.whatsapp || '',
        application.domain1 || '',
        application.domain2 || '',
        application.link || '',
        application.interest || '',
      ]);

      return json_({
        success: true,
        duplicate: false,
      });
    }

    return json_({
      success: false,
      message: 'Invalid action',
    });
  } catch (error) {
    console.error(error);

    return json_({
      success: false,
      message: 'Failed to process application',
    });
  } finally {
    lock.releaseLock();
  }
}

function getSheet_() {
  const sheet = SpreadsheetApp
    .openById(SPREADSHEET_ID)
    .getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error(`Sheet tab "${SHEET_NAME}" was not found`);
  }

  return sheet;
}

function findDuplicate_(sheet, email, scholar) {
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return false;
  }

  // Columns C and E are Email and Scholar Number.
  const rows = sheet.getRange(2, 3, lastRow - 1, 3).getValues();

  const targetEmail = String(email || '').trim().toLowerCase();
  const targetScholar = String(scholar || '').trim().toUpperCase();

  return rows.some((row) => {
    const rowEmail = String(row[0] || '').trim().toLowerCase();
    const rowScholar = String(row[2] || '').trim().toUpperCase();

    return (
      (targetEmail && rowEmail === targetEmail) ||
      (targetScholar && rowScholar === targetScholar)
    );
  });
}

function json_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Replace `YOUR_SPREADSHEET_ID` with the ID from the Google Sheet URL:

`https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

### 3. Deploy as a Web App

In Apps Script:

1. Click **Deploy → New deployment**.
2. Select **Web app**.
3. Set **Execute as:** Me.
4. Set access so your public website can send requests.
5. Click **Deploy**.
6. Complete Google's authorization prompts.
7. Copy the Web App URL ending in `/exec`.

Use the `/exec` URL in production. Do not use the `/dev` test URL.

### 4. Configure the backend

Local `.env`:

```env
GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
PORT=8787
```

Restart the backend after changing `.env`.

### 5. Test

Submit a test application from the website.

The request flow is:

```text
React
  ↓
Express /api/applications
  ↓
Validation + sanitization + rate limiting
  ↓
Duplicate check
  ↓
Google Apps Script Web App
  ↓
Google Sheet
```

The Apps Script also performs a duplicate check inside a lock immediately before
writing, which protects against simultaneous submissions.

## API

```text
GET  /api/health          → { ok, service, storage }
POST /api/applications    → 201 { applicationId } | 409 duplicate | 422 { errors }
```

Server-side: validation, sanitization, duplicate detection (email **or** scholar
number), `SPK-XXXXXX` id generation, ISO timestamp, one spreadsheet row per
submission, and rate limiting (25 / 10 min / IP).

## Deployment

### Render

The included `render.yaml` configures:

- Node build
- production start command
- `/api/health` health check
- `GOOGLE_APPS_SCRIPT_URL` as a secret environment variable

In the Render dashboard, set:

```text
GOOGLE_APPS_SCRIPT_URL=<your /exec URL>
```

Do not commit your real `.env`.

### Vercel

The existing `vercel.json` can be used as-is.

Set this environment variable in the Vercel project settings:

```text
GOOGLE_APPS_SCRIPT_URL=<your /exec URL>
```

The frontend never receives this value.

## Structure

```text
src/
  components/
  sections/
  pages/
  application/
  context/
  hooks/
  utils/
  assets/

server/
  routes/
  controllers/
  services/
    store.js
    googleAppsScript.js
    localStore.js
  middleware/
  utils/

api/
  index.js
```

## Design notes

- Palette: `#05060A · #0A0D14 · #F5F5F2 · #1557FF` — blue is an accent, not a theme.
- Type: Space Grotesk (display) + Inter (body) + JetBrains Mono (system labels),
  all self-hosted.
- The uploaded SPARK logo is used as-is; its black plate is dissolved into dark
  surfaces with `mix-blend-mode: screen` (the artwork itself is untouched).
- Motion language is engineered: line-mask reveals, circuit path draws, 2–4px
  hover shifts, magnetic CTAs, node-field canvas that leans toward the pointer.
  Everything degrades under `prefers-reduced-motion`.
