import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Course } from '../courses/course';
import { transition } from '@angular/core/src/animation/dsl';

@Injectable()
export class CourseService  {
  public courses$ = new Subject<any>();
  public search$ = new Subject<boolean>();

  private courseUrl = 'http://localhost:4204/courses';
  private queryUrl = '/search?q=';

  constructor(private http: HttpClient) { }

  // TODO: remove this
  courses = [];

  public getAllCourses(): Observable<Array<Course>> {
    return this.http.get(`${this.courseUrl}/all`)
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public getCourses(options?: any): Observable<Array<Course>> {
    const url = `${this.courseUrl}?page=${options.page}&size=${options.size}`;
    const params = new HttpParams().set('page', options.page).set('size', options.size);

    // let request = this.http.get(url, options).publishLast().refCount();
    const request = this.http.get(url, options);

    request.subscribe(courses => {
      this.courses$.next(courses);
    });

    return request
      // .do(data => console.log('By page: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  public getCourseById(id: number): Observable<Course> {
    this.courses.find(course => course.id === id)
    return Observable.of(this.courses.find(course => course.id === id));
  }

  public addCourse(course: Course) {
    return this.http.post(this.courseUrl, course);
  }

  public editCourse(id: number, name: string, duration: number, description: string): Observable<Course> {
    const index = this.courses.findIndex(course => course.id === id);
    this.courses[index].name = name;
    this.courses[index].duration = duration;
    this.courses[index].description = description;
    return Observable.of(this.courses[index]);
  }

  public deleteCourse(course: Course) {
    return this.http.delete(`${this.courseUrl}/${course.id}`, this.setHeaders());
    // const deletedCourse = this.getCourses().find(c => c.id === course.id)
    // const index = this.courses.indexOf(deletedCourse);
    // if (index >= 0) {
    //   this.courses.splice(index, 1);
    //   return Observable.of(this.courses);
    // }
  }

  public search(options?: any): Observable<any> {
    const url = this.courseUrl + this.queryUrl + options.term;
    const params = new HttpParams().set('q', options.term);
    // return this.http.get(url, options);
    const request = this.http.get(url, options);
    request.subscribe(() => {
      this.search$.next(true);
    });
    return request
      // .do(data => console.log('search: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private setHeaders(options?: any) {
    if (!options) {
      options = { headers: {} };
    } else if (!options.headers) {
      options.headers = {};
    }

    // TODO: set token

    // options.headers['Content-Type'] = 'application/json; charset=utf-8');
    // options.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS');
    // options.headers['Access-Control-Allow-Origin'] = '*';
    // options.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Z-Key';

    if (options.headers) {
      let headers = new HttpHeaders();
      headers = headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      headers = headers.set('Access-Control-Allow-Origin', '*');
      headers = headers.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
      options.headers = headers;
    }

    if (options.params) {
      let params = new HttpParams();
      for (const key in options.params) {
          if (options.params.hasOwnProperty(key)) {
              params = params.set(key, options.params[key]);
          }
      }
      options.params = params;
    }

    // options.headers = new HttpHeaders(options.headers);
    console.log(options.headers);
    console.log(options.params);
    debugger;

    return options;
  }

  private handleError(error: Response) {
    console.log('error', error);
    return Observable.throw(error || 'Server error');
  }
}
