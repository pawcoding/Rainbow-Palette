import { ValidatorFn } from '@angular/forms';

/**
 * Validator that checks if the value is already in the array.
 */
export function duplicateValidator(values: Array<string>): ValidatorFn {
  // Normalize the values
  const normalizedValues = values.map((value) => normalize(value));

  return (control) => {
    const normalizedValue = normalize(control.value);

    // Check if the value is already in the array
    const duplicate = normalizedValues.findIndex((value) => value === normalizedValue);
    if (duplicate === -1) {
      // No duplicate found
      return null;
    }

    // Return duplicate
    return { duplicate: { value: values.at(duplicate) } };
  };
}

/**
 * Normalize a string by removing whitespace and converting to lowercase.
 */
function normalize(value: string): string {
  return value.trim().replace(/\s+/g, '').toLowerCase();
}
