import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/of';

import { Course } from '../models/course';
import { Author } from '../models/author';

@Injectable()
export class CourseService  {
  public courses$ = new Subject<any>();
  public search$ = new Subject<boolean>();

  private courses: Array<Course> = [];
  private courseUrl = 'http://localhost:4204/courses';
  private queryUrl = '/search?q=';

  constructor(private http: HttpClient) { }

  public getAllCourses(): Observable<Array<Course>> {
    return this.http.get(`${this.courseUrl}/all`)
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public getCourses(options?: any): Observable<Array<Course>> {
    const url = `${this.courseUrl}?page=${options.page}&size=${options.size}`;
    const params = new HttpParams().set('page', options.page).set('size', options.size);
    // let request = this.http.get(url, options).publishLast().refCount();
    const request = this.http.get(url);

    request.subscribe(courses => {
      this.courses$.next(courses);
    });

    return request
      // .do(data => console.log('By page: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public getCourseById(id: number): Observable<Course> {
    this.courses.find(course => course.id === id);
    return Observable.of(this.courses.find(course => course.id === id));
  }

  public addCourse(course: Course) {
    return this.http.post(this.courseUrl, course);
  }

  public getAuthors(): Observable<Array<Author>> {
    return this.http.get(`${this.courseUrl}/authors`)
      // .do(data => console.log('Authors: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public editCourse(id: number, name: string, duration: number, description: string): Observable<Course> {
    const index = this.courses.findIndex(course => course.id === id);
    this.courses[index].name = name;
    this.courses[index].duration = duration;
    this.courses[index].description = description;
    return Observable.of(this.courses[index]);
  }

  public deleteCourse(course: Course): Observable<Object> {
    return this.http.delete(`${this.courseUrl}/delete/${course.id}`);
  }

  public search(options?: any): Observable<any> {
    const url = this.courseUrl + this.queryUrl + options.term;
    const params = new HttpParams().set('q', options.term);
    const request = this.http.get(url);
    request.subscribe(() => {
      this.search$.next(true);
    });
    return request
      // .do(data => console.log('search: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.log('error', error);
    return Observable.throw(error || 'Server error');
  }
}
