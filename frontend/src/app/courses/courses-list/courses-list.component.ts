import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CourseService } from '../../services/course.service';
import { LoaderService } from '../../services/loader.service';
import { OrderByPipe } from '../../pipes/orderBy.pipe';
import { Course } from '../../models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: [OrderByPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesListComponent implements OnInit, OnDestroy {
  public courses: Array<Course> = [];
  public total = 0;
  public page = 1;
  public size = 3;
  public hidePages = false;
  private errorMessage: string;
  private subscriptions: Array<Subscription> = [];

  constructor(
    private courseService: CourseService,
    private loaderService: LoaderService,
    private orderBy: OrderByPipe,
    private ref: ChangeDetectorRef
  ) {
    /*
    this.subscription = courseService.dataFiltered$.subscribe(
      courses => {
        this.courses = orderBy.transform(courses, 'name'); // on search courses are ordered by name
        this.ref.detectChanges();
      }
    );
    */
  }

  public goToPage(n: number): void {
    this.page = n;
    this.getCourses({ page: this.page, size: this.size });
  }

  public onNext(): void {
    this.page++;
    this.getCourses({ page: this.page, size: this.size });
  }

  public onPrev(): void {
    this.page--;
    this.getCourses({ page: this.page, size: this.size });
  }

  ngOnInit(): void {
    this.subscriptions.push(this.courseService.getAllCourses().subscribe(data => {
      this.total = data.length;
    }));
    this.getCourses({ page: this.page, size: this.size });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private getCourses({ page, size }): void {
    const currentDate = new Date().getTime();
    const twoWeeks = 14 * 24 * 60 * 60 * 1000;

    this.subscriptions.push(this.courseService.courses$.subscribe(courses => {
      this.loaderService.display(true);
      let coursesData = this.orderBy.transform(courses, 'date');
      coursesData = coursesData
        // .filter(course => new Date(course.date).getTime() >= currentDate - twoWeeks) // nonsense after adding pagination
        .map(course => new Course(
          course.id,
          course.name,
          course.duration,
          course.topRated,
          course.date,
          course.description,
          course.authors
        ));

        this.loaderService.display(false);
        this.courses = coursesData;
        this.ref.detectChanges();
      },
      error => this.errorMessage = <any>error));

    this.courseService.search$.subscribe(data => {
      this.hidePages = data;
    });

    this.courseService.getCourses({ page, size });
  }

  private onEdit(course) {
    // TODO: implement edit
    console.log(`edited course with id ${course.id}`);
    this.courseService.editCourse$.next(course.name);
  }

  private onDelete(course): void {
    console.log(`deleted course with id ${course.id}`);
    this.courseService.deleteCourse(course);
    this.courses = this.courses.filter(c => c !== course);
  }

}
