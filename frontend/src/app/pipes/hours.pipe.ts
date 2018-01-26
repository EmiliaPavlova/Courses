import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hours' })

export class HoursPipe implements PipeTransform {
  transform(value: number): string {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    const result = hours ? `${hours} h` : '';
    return result + (minutes !== 0 ? ` ${minutes} min` : '');
  }
}
