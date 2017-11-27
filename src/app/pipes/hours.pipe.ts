import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'hours'})

export class HoursPipe implements PipeTransform {
  transform(value: number): string {
    let hours = Math.floor(value / 60);
    let minutes = value % 60;
    let result = hours ? `${hours} h `: '';
    return result + `${minutes} min`;
  }
}