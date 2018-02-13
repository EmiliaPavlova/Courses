import { AbstractControl, FormArray } from '@angular/forms';

export function ValidateAuthors(Array: any) {
    const message = {
        'message': 'At least one author must be selected!'
    };
    let isValid: boolean;

    if (Array.controls.length > 0) {
        isValid = true;
    } else {
        isValid = false;
    }

    return isValid ? null : message;
}
