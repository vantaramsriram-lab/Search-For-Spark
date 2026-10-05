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
