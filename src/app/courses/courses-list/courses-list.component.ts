import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
// import { ICourse } from '../course';
import { Course } from '../course';
import { CourseService } from '../../services/course.service';
import { OrderByPipe } from '../../pipes/orderBy.pipe';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [OrderByPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit {
  // courses: ICourse[];
  courses: Course[];
  errorMessage: string;

  constructor(
    private courseService: CourseService,
    private orderBy: OrderByPipe
  ) {
    courseService.dataFiltered$.subscribe(
      courses => {
        this.courses = orderBy.transform(courses, 'name'); // on search courses are ordered by name
      }
    )
  }

  editCourse(course) {

  }

  ngOnInit(): void {
    // this.courseService.getCourses()
    //   .subscribe(courses => this.courses = courses,
    //     error => this.errorMessage = <any>error);
    this.courses = this.orderBy.transform(this.courseService.getCourses(), 'date');
  }

}
