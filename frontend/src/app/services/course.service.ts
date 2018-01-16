import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import { Course } from '../courses/course';
import { transition } from '@angular/core/src/animation/dsl';

@Injectable()
export class CourseService {
  private courseUrl = 'http://localhost:4204/courses';
  private courses$ = new Subject<Array<Course>>();
  private dataFilteredSource = new Subject<Array<Course>>();
  dataFiltered$ = this.dataFilteredSource.asObservable();

  constructor(private http: HttpClient) { }

  // TODO: remove this
  courses = [];
  
  getCourses(): Observable<Array<Course>> {
    // let pageParams = new URLSearchParams();
    // pageParams.append('params', params);
    return this.http.get(this.courseUrl)
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getCourseById(id: number): Observable<Course> {
    this.courses.find(course => course.id === id)
    return Observable.of(this.courses.find(course => course.id === id));
  }

  addCourse(course: Course) {
    return this.http.post(this.courseUrl, course);
  }

  editCourse(id: number, name: string, duration: number, description: string): Observable<Course> {
    const index = this.courses.findIndex(course => course.id === id);
    this.courses[index].name = name;
    this.courses[index].duration = duration;
    this.courses[index].description = description;
    return Observable.of(this.courses[index]);
  }

  deleteCourse(course: Course) {
    return this.http.delete(`${this.courseUrl}/${course.id}`);
    // const deletedCourse = this.getCourses().find(c => c.id === course.id)
    // const index = this.courses.indexOf(deletedCourse);
    // if (index >= 0) {
    //   this.courses.splice(index, 1);
    //   return Observable.of(this.courses);
    // }
  }

  filterCoursesByString(searchString: string) {
    const filteredCourses = this.courses.filter(course => course.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1);
    this.dataFilteredSource.next(filteredCourses);
  }

  private handleError(error: Response) {
    console.log('error', error);
    return Observable.throw(error || 'Server error');
  }
}
