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
export class CourseService {
  private courseUrl: string = 'http://localhost:4204/courses';
  private queryUrl: string = '?search=';  
  private courses$ = new Subject<Array<Course>>();
  private dataFilteredSource = new Subject<Array<Course>>();
  dataFiltered$ = this.dataFilteredSource.asObservable();

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
    let params = new HttpParams().set('page', options.page).set('size', options.size);;
    return this.http.get(url, options)
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
    return this.http.delete(`${this.courseUrl}/${course.id}`);
    // const deletedCourse = this.getCourses().find(c => c.id === course.id)
    // const index = this.courses.indexOf(deletedCourse);
    // if (index >= 0) {
    //   this.courses.splice(index, 1);
    //   return Observable.of(this.courses);
    // }
  }

  search(term: string) {
    debugger
    return this.http
    .get(this.courseUrl + this.queryUrl + term);
    // return terms.debounceTime(400)
    //   .distinctUntilChanged()
    //   .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    debugger
    return this.http
        .get(this.courseUrl + this.queryUrl + term);
  }

  filterCoursesByString(searchString: string) {
    const filteredCourses = this.courses.filter(course => course.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1);
    this.dataFilteredSource.next(filteredCourses);
  }

  private setHeaders(options: any) {
    if (!options) {
      options = { headers: {} };
    } else if (!options.headers) {
      options.headers = {};
    }

    // TODO: set token

    if (!options.headers['Content-Type']) {
      options.headers['Content-Type'] = 'application/json; charset=utf-8';
    }

    if (options.params) {
      let params = new HttpParams();
      for (let key in options.params) {
          if (options.params.hasOwnProperty(key)) {
              params = params.set(key, options.params[key]);
          }
      }
      options.params = params;
    }

    options.headers = new HttpHeaders(options.headers);

    return options;
  }

  private handleError(error: Response) {
    console.log('error', error);
    return Observable.throw(error || 'Server error');
  }
}
