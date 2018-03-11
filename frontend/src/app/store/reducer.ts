import { AppState } from './appState';
import { Course } from '../models/course';
import {
  ADD_COURSE,
  DELETE_COURSE,
  EDIT_COURSE,
  FILTER_COURSES,
  REQUEST_COURSES_SUCCESS,
  RESET_FILTER,
} from './course.actions';

const courses = [];

const initialState: AppState = {
  courses: courses,
};

function addCourse(state, action): AppState {
  const course = action.course;
  course.id = state.courses.length + 1;
  course.topRated = false;
  return Object.assign({}, state, {
    courses: state.courses.push(course)
  });
}

function deleteCourse(state, action): AppState {
  return Object.assign({}, state, {
    courses: state.courses.filter(course => course.id !== action.id)
  });
}

function editCourse(state, action): AppState {
    return Object.assign({}, state, {
      courses: state.courses.splice(action.id - 1, 1, action.course)
    });
  }

function filterCourses(state, action): AppState {
  return Object.assign({}, state, {
    courses: state.courses.filter(course =>
        course.name.toLowerCase().indexOf(action.searchString.toLowerCase()) > -1)
  });
}

function storeCourses(state, action): AppState {
  return Object.assign({}, state, {
    courses: action.courses,
  });
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COURSE:
      return addCourse(state, action);
    case DELETE_COURSE:
      return deleteCourse(state, action);
    case EDIT_COURSE:
      return editCourse(state, action);
    case FILTER_COURSES:
      return filterCourses(state, action);
    case REQUEST_COURSES_SUCCESS:
      return storeCourses(state, action);
    case RESET_FILTER:
      return initialState;
    default:
      return state;
  }
}

// https://app.pluralsight.com/player?course=angular-2-redux-manage-state&author=hendrik-swanepoel&name=angular-2-redux-manage-state-m2&clip=4&mode=live
