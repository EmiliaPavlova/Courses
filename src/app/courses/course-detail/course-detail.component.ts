import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailComponent implements OnInit {
  @Input() course;
  @Output() edit = new EventEmitter();
  public startDate: DateTimeFormat;
  public showModal = false;

  constructor(private courseService: CourseService) {
  }

  onEdit(): void {
    console.log('edited');
    this.edit.emit(this.course);
  }

  onDelete(): void {
    console.log(`deleted course with id ${this.course.id}`);
    this.courseService.deleteCourse(this.course);
  }

  onFilter(searchString): void {
    this.courseService.filterCourses(searchString);
  }

  ngOnInit() {
    this.startDate = this.course.date;
  }

}
