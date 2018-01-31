import { AbstractControl } from '@angular/forms';

export function ValidateDate(string: AbstractControl) {
    const longMonths = ['01', '03', '05', '07', '08', '10', '12'];
    const shortMonths = ['04', '06', '09', '11'];
    const pattern = new RegExp('^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/((?:19|20)[0-9]{2})');
    let isValid;
    const message = {
        'message': 'Date must be in format dd/MM/yyyy!'
    };
    const results = pattern.exec(string.value);

    if (!results) {
        isValid = false;
    } else if (parseInt(results[3], 10) < 2000) {
        isValid = false;
        message.message = 'Date can not be before year 2000!';
    } else if (shortMonths.indexOf(results[2]) > -1 && parseInt(results[1], 10) > 30 ||
                (results[2] === '02' && parseInt(results[3], 10) % 4 !== 0) && parseInt(results[1], 10) > 28) {
        isValid = false;
        message.message = 'Date is invalid';
    } else {
        isValid = true;
    }
    return isValid ? null : message;
}
