import { Component, OnInit } from '@angular/core';
// import { ICourse } from '../course';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})

export class CoursesListComponent implements OnInit {
  // courses: ICourse[];
  courses: Course[];
  errorMessage: string;

  constructor(private _courseService: CourseService) { }

  editCourse(course) {
    
  }

  deleteCourse(course) {
    
  }

  ngOnInit(): void {
    this._courseService.getCourses()
      .subscribe(courses => this.courses = courses,
        error => this.errorMessage = <any>error);
  }

}
