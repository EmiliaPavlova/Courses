import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
// import { ICourse } from './course';
import { Course } from './course';

@Injectable()
export class CourseService {
  // private _courseUrl = '/assets/seed/courses.json';
  // private courses: Course[]; // Class or interface?

  constructor() {}
  // constructor(private _http: Http) {}

  getCourses() {
    return this.courses;
  }

  getCourseById(id: number) {
    return this.courses.find(course => course.id === id);
  }

  addCourse(course) {
    this.courses.push(course);
  }

  editCourse(id: number, name: string, duration: number, description: string) {
    let index = this.courses.findIndex(course => course.id === id);
    this.courses[index].name = name;
    this.courses[index].duration = duration;
    this.courses[index].description = description;
  }

  deleteCourse(id: number) {
    return this.courses.filter(course => course.id !== id);
  }

  // TODO: remove this bullshit in the next branch
  courses = [
    {
      id: 1,
      name: "1",
      duration: 88,
      date: "Wed Nov 20 2017 00:00:00 GMT+0200 (EET)",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin iaculis arcu sit amet lobortis. Donec vehicula urna bibendum tincidunt auctor. Praesent eu sem blandit, placerat purus et, facilisis metus. Vestibulum et ante lorem. Suspendisse et ultrices leo. Suspendisse sagittis varius orci pretium mattis. Duis congue eros consequat neque gravida finibus. Suspendisse tortor leo, mattis sed velit non, pulvinar mollis massa. Nunc a porttitor ipsum."
    },
    {
      id: 2,
      name: "2",
      duration: 15,
      date: "Wed Nov 22 2017 00:00:00 GMT+0200 (EET)",
      description: "Integer viverra urna et accumsan volutpat. Sed eget nisi aliquet, mattis nisl ac, feugiat arcu. Maecenas interdum ipsum et purus rhoncus, et porttitor odio tempor. Mauris malesuada congue accumsan. Quisque dignissim, magna at tincidunt efficitur, ipsum ligula mattis lacus, sit amet ullamcorper lorem justo quis sem. Proin nec purus purus. In hac habitasse platea dictumst. Donec lectus ipsum, vulputate quis tristique quis, pulvinar eget ante."
    },
    {
      id: 3,
      name: "3",
      duration: 135,
      date: "Wed Nov 24 2017 00:00:00 GMT+0200 (EET)",
      description: "Donec semper sem nec scelerisque mollis. Duis malesuada risus ut tincidunt rhoncus. Suspendisse eros nisl, imperdiet eget consequat eget, aliquam vel elit."
    }
  ]

  /*getCourses(): Observable<ICourse[]> {
    return this._http.get(this._courseUrl)
      .map((response: Response) => <ICourse[]> response.json())
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }*/

  private handleError(error: Response) {
    console.log('error', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}