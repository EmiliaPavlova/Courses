import { Component, OnInit } from '@angular/core';
import template from './courses-list.component.html';
import styles from './courses-list.component.css';
// import { ICourse } from '../course';
// import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses-list',
  template,
  styles: [styles]
})
export class CoursesListComponent implements OnInit {
  // courses: ICourse[];
  // errorMessage: string;

  // constructor(private _courseService: CourseService) { }

  deleteCourse(courseDetail) {

  }

  firstCourseDetail = {
    id: 1,
    name: "1",
    duration: "1h 28 min",
    date: "date",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in tellus eget risus aliquet sagittis lacinia non urna. Sed et porta massa. Praesent tristique quam fermentum enim mattis fringilla. Etiam tortor lectus, rhoncus id tortor et, molestie dignissim leo."
  };

  ngOnInit() {}

  // ngOnInit(): void {
  //   this._courseService.getCourses()
  //     .subscribe(courses => this.courses = courses,
  //       error => this.errorMessage = <any>error);
  // }

}
