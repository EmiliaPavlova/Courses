import { AppState } from './appState';
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';

export const DELETE_COURSE = 'DELETE_COURSE';
export const FILTER_COURSES = 'FILTER_COURSES';
export const RESET_FILTER = 'RESET_FILTER';

@Injectable()
export class CourseActions {
    constructor(
      private ngRedux: NgRedux<AppState>
    ) {}

  filterCourses(searchString: string) {
    this.ngRedux.dispatch({
      type: FILTER_COURSES,
      searchString,
    });
  }

  resetFilter() {
    this.ngRedux.dispatch({
      type: RESET_FILTER,
    });
  }

  deleteCourse(id: number) {
    this.ngRedux.dispatch({
      type: DELETE_COURSE,
      id,
    });
  }
}
