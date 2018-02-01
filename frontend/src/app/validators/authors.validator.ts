import { AbstractControl } from '@angular/forms';

export function ValidateAuthors(checkbox: AbstractControl) {
  const message = {
      'message': 'At least one author must be selected!'
  };
  let count = 0;
  let isValid: boolean;

  count = checkbox.value ? ++count : --count;

  if (count < 1) {
    isValid = false;
  } else {
    isValid = true;
  }

  return isValid ? null : message;
}
