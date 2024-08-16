import { ValidatorFn } from '@angular/forms';
import { normalizeName } from '../../shared/utils/normalize-name';

/**
 * Validator that checks if the value is already in the array.
 */
export function duplicateValidator(values: Array<string>): ValidatorFn {
  // Normalize the values
  const normalizedValues = values.map((value) => normalizeName(value));

  return (control) => {
    const normalizedValue = normalizeName(control.value);

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
