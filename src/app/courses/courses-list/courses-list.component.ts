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

  constructor(private courseService: CourseService) { }

  editCourse(course) {
    
  }

  ngOnInit(): void {
    // this.courseService.getCourses()
    //   .subscribe(courses => this.courses = courses,
    //     error => this.errorMessage = <any>error);
    this.courses = this.courseService.getCourses();
  }

}
