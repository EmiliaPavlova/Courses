import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { ICourse } from './course';

@Injectable()
export class CourseService {
  private _courseUrl = '/assets/seed/courses.json';

  constructor(private _http: Http) {}

  getCourses(): Observable<ICourse[]> {
    return this._http.get(this._courseUrl)
      .map((response: Response) => <ICourse[]> response.json())
      // .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.log('error', error);
    return Observable.throw(error.json().error || 'Server error');
  }
}