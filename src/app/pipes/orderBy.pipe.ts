import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../courses/course';

@Pipe({ name: 'orderBy' })

export class OrderByPipe implements PipeTransform {
    transform(array: Array<Course>, args: string): Array<Course> {
        array.sort((a: any, b: any) => {
            if (a[args] < b[args]) {
                return -1;
            } else if (a[args] > b[args]) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}
