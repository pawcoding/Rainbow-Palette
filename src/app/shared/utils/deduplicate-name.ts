import { normalizeName } from './normalize-name';

/**
 * Deduplicate a name by adding a number to the end if it already exists.
 */
export function deduplicateName(name: string, existingNames: Array<string>): string {
  const normalizedNames = existingNames.map((n) => normalizeName(n));

  // Check if name already exists
  while (normalizedNames.includes(normalizeName(name))) {
    // Check if the name already has a number
    const lastNumber = name.match(/\d+$/);
    if (lastNumber) {
      // Increment the number
      const number = parseInt(lastNumber[0], 10);
      name = name.replace(/\d+$/, '') + (number + 1);
    } else {
      // Add a number to the color name
      name += ' 2';
    }
  }

  // Return the deduplicated name
  return name;
}
