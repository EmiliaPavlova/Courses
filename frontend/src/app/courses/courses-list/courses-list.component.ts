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
  // public loading = false;
  public total = 0;
  public page = 1;
  public size = 3;
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
    console.log(`deleted course with id ${course.id}`);
    this.courseService.deleteCourse(course).subscribe(() => this.getCourses({ page: this.page, size: this.size} ));
  }

  onFilter(searchString): void {
    this.courseService.filterCoursesByString(searchString);
  }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe(data =>
      this.total = data['courses'].length);
    this.getCourses({ page: this.page, size: this.size});
  }

  getCourses({ page, size }): void {
    const currentDate = new Date().getTime();
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;
    // this.loading = true;
    this.courses$ = this.courseService.getCourses({ page, size });

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
        // this.loading = false;
    },
      error => this.errorMessage = <any>error);
  }

  private getPagesCount(): any {
    return this.courseService.getAllCourses().subscribe(courses => {
      this.total = courses.length;
    });
  }

  goToPage(n: number): void {
    this.page = n;
    this.getCourses({ page: this.page, size: this.size });
  }

  onNext(): void {
    this.page++;
    this.getCourses({ page: this.page, size: this.size });
  }

  onPrev(): void {
    this.page--;
    this.getCourses({ page: this.page, size: this.size });
}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
