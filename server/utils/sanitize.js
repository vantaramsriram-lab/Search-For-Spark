/** Strip control characters and collapse internal whitespace for short fields. */
export function cleanString(value, { collapse = true, max = 2000 } = {}) {
  if (typeof value !== 'string') return '';
  let s = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  if (collapse) s = s.replace(/\s+/g, ' ');
  return s.trim().slice(0, max);
}
