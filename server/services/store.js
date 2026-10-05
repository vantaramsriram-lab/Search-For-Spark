import { isConfigured, appsScriptStore } from './googleAppsScript.js';
import { localStore } from './localStore.js';

/**
 * Single storage entry point.
 * With Google Apps Script configured, applications are stored in the
 * Google Sheet behind the Apps Script web app. Without it, local JSON
 * storage is used for local development.
 */
export const storageMode = isConfigured() ? 'google-apps-script' : 'local';
export const store = isConfigured() ? appsScriptStore : localStore;
