import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
// import { ICourse } from './course';
import { Course } from '../courses/course';
import { transition } from '@angular/core/src/animation/dsl';

@Injectable()
export class CourseService {
  private courseUrl = '/assets/seed/courses.json';
  // private courses: Course[]; // Class or interface?
  private dataFilteredSource = new Subject<Array<Course>>();
  dataFiltered$ = this.dataFilteredSource.asObservable();

  constructor(private http: Http) { }

  getCourses() {
    return this.courses;
  }

  /*
  getCourses(): Observable<Course[]> {
    return this.http.get(this.courseUrl)
      .map((response: Response) => <Course[]>response.json())
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }
  */

  getCourseById(id: number) {
    return this.courses.find(course => course.id === id);
  }

  addCourse(course) {
    this.courses.push(course);

    // this.http.post(this.courseUrl, { body: { 'Name': 'New course'} });
  }

  editCourse(id: number, name: string, duration: number, description: string) {
    let index = this.courses.findIndex(course => course.id === id);
    this.courses[index].name = name;
    this.courses[index].duration = duration;
    this.courses[index].description = description;
  }

  deleteCourse(course) {
    let index = this.courses.indexOf(course);
    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }

  filterCourses(searchString) {
    let filteredCourses = this.courses.filter(course => course.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1);
    this.dataFilteredSource.next(filteredCourses);
  }

  // TODO: remove this
  courses = [
    {
      id: 1,
      name: "Video course 1",
      duration: 88,
      topRated: true,
      date: "2017-12-6",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin iaculis arcu sit amet lobortis. Donec vehicula urna bibendum tincidunt auctor. Praesent eu sem blandit, placerat purus et, facilisis metus. Vestibulum et ante lorem. Suspendisse et ultrices leo. Suspendisse sagittis varius orci pretium mattis. Duis congue eros consequat neque gravida finibus. Suspendisse tortor leo, mattis sed velit non, pulvinar mollis massa. Nunc a porttitor ipsum."
    },
    {
      id: 2,
      name: "Video course 2",
      duration: 15,
      topRated: false,
      date: "2018-1-12",
      description: "Integer viverra urna et accumsan volutpat. Sed eget nisi aliquet, mattis nisl ac, feugiat arcu. Maecenas interdum ipsum et purus rhoncus, et porttitor odio tempor. Mauris malesuada congue accumsan. Quisque dignissim, magna at tincidunt efficitur, ipsum ligula mattis lacus, sit amet ullamcorper lorem justo quis sem. Proin nec purus purus. In hac habitasse platea dictumst. Donec lectus ipsum, vulputate quis tristique quis, pulvinar eget ante."
    },
    {
      id: 3,
      name: "Video course 3",
      duration: 135,
      topRated: true,
      date: "2017-10-18",
      description: "Donec semper sem nec scelerisque mollis. Duis malesuada risus ut tincidunt rhoncus. Suspendisse eros nisl, imperdiet eget consequat eget, aliquam vel elit."
    }
  ]

  private handleError(error: Response) {
    console.log('error', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}