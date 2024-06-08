/**
 * Generate a random id with the specified length.
 * The id contains only lowercase letters and numbers.
 *
 * @param length The length of the id.
 */
export function generateId(length: number): string {
  let result = '';
  do {
    result += Math.random().toString(36).substring(2, 9);
  } while (result.length < length);
  return result.substring(0, length);
}
