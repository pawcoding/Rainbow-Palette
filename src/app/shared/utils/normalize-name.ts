/**
 * Normalize a string by removing whitespace and converting to lowercase.
 */
export function normalizeName(value: string): string {
  return value.trim().replace(/\s+/g, '').toLowerCase();
}
