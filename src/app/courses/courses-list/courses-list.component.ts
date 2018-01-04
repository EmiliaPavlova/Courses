import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from "rxjs/Subscription";
import { Course } from '../course';
import { CourseService } from '../../services/course.service';
import { LoaderService } from '../../services/loader.service';
import { OrderByPipe } from '../../pipes/orderBy.pipe';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [OrderByPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit {
  public courses: Array<Course>;
  private courses$: Observable<Array<Course>>;
  private errorMessage: string;
  private subscription: ISubscription;

  constructor(
    private courseService: CourseService,
    private loaderService: LoaderService,
    private orderBy: OrderByPipe,
    private ref: ChangeDetectorRef
  ) {
    this.subscription = courseService.dataFiltered$.subscribe(
      courses => {
        this.courses = orderBy.transform(courses, 'name'); // on search courses are ordered by name
        this.ref.detectChanges();
      }
    );
  }

  onEdit(course) {
    // TODO: implement edit
    console.log(`edited course with id ${course.id}`);
  }

  onDelete(course): void {
    this.courseService.deleteCourse(course).subscribe(data => this.courses = data);
    console.log(`deleted course with id ${course.id}`);
  }

  onFilter(searchString): void {
    this.courseService.filterCoursesByString(searchString);
  }

  ngOnInit(): void {
    const currentDate = new Date().getTime();
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    this.courses$ = this.courseService.getCourses()


    this.courses$.subscribe(courses => {
      this.loaderService.display(true);
      this.courses = this.orderBy.transform(courses, 'date');
      this.courses = this.courses
        .filter(course => new Date(course.date).getTime() >= currentDate - twoWeeks)
        .map(course => new Course(
          course.id,
          course.name,
          course.duration,
          course.topRated,
          course.date,
          course.description,
        ));
      this.ref.detectChanges();
      this.loaderService.display(false);
    },
      error => this.errorMessage = <any>error);


    // this.coursesObservable = this.courseService.getCourses();
    /*
    .subscribe(courses => {
       this.courses = courses;
       this.cdRef.detectChanges();
     },
     error => this.errorMessage = <any>error);
    */

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
