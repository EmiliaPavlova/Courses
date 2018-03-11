import { AppState } from './appState';
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';

export const ADD_COURSE = 'ADD_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';
export const EDIT_COURSE = 'EDIT_COURSE';
export const FILTER_COURSES = 'FILTER_COURSES';
export const REQUEST_COURSES_SUCCESS = 'REQUEST_COURSES_SUCCESS';
export const RESET_FILTER = 'RESET_FILTER';

@Injectable()
export class CourseActions {
    constructor(
      private ngRedux: NgRedux<AppState>,
      private courseService: CourseService
    ) {}

    getCourses(options) {
      this.courseService.getCourses(options).subscribe(courses => {
        this.ngRedux.dispatch({
            type: REQUEST_COURSES_SUCCESS,
            courses,
        });
      });
    }

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

  addCourse(course: Course) {
    this.ngRedux.dispatch({
      type: ADD_COURSE,
      course,
    });
  }

  editCourse(id: number, course: Course) {
    this.ngRedux.dispatch({
      type: EDIT_COURSE,
      id,
      course,
    });
  }
}
