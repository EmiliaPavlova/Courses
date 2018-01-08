import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import { Course } from '../courses/course';
import { transition } from '@angular/core/src/animation/dsl';

@Injectable()
export class CourseService {
  // private courseUrl = '/assets/seed/courses.json';
  private courseUrl = 'http://localhost:4204/api';
  private courses$ = new Subject<Array<Course>>(); // Class or interface?
  private dataFilteredSource = new Subject<Array<Course>>();
  dataFiltered$ = this.dataFilteredSource.asObservable();

  // constructor() { }
  constructor(private http: Http) { }

  // TODO: remove this
  courses = [];


  /*
  getCourses(): Observable<Array<Course>> {
    // return this.courses;
    return Observable.of(this.courses);
  }
  */

  getCourses(): Observable<Array<Course>> {
    return this.http.get(this.courseUrl + '/courses')
      .map((response: Response) => <Course[]>response.json())
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getCourseById(id: number): Observable<Course> {
    // return this.courses.find(course => course.id === id);
    this.courses.find(course => course.id === id)
    return Observable.of(this.courses.find(course => course.id === id));
  }

  /*
  addCourse(course: Course) {
    // this.courses.push(course);

    this.http.post(this.courseUrl + '/courses', course);
  }
  */

  editCourse(id: number, name: string, duration: number, description: string): Observable<Course> {
    const index = this.courses.findIndex(course => course.id === id);
    this.courses[index].name = name;
    this.courses[index].duration = duration;
    this.courses[index].description = description;
    return Observable.of(this.courses[index]);
  }

  deleteCourse(course: Course): Observable<Array<Course>> {
    const deletedCourse = this.courses.find(c => c.id === course.id)
    const index = this.courses.indexOf(deletedCourse);
    if (index >= 0) {
      this.courses.splice(index, 1);
      return Observable.of(this.courses);
    }
  }

  filterCoursesByString(searchString: string) {
    const filteredCourses = this.courses.filter(course => course.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1);
    this.dataFilteredSource.next(filteredCourses);
  }

  private handleError(error: Response) {
    console.log('error', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
