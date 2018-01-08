import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseDetailComponent implements OnInit {
  @Input() course;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();
  public startDate: DateTimeFormat;
  public showModal = false;

  constructor() { }

  onEdit(): void {
    this.edit.emit(this.course);
  }

  onDelete(): void {
    this.delete.emit(this.course);
  }

  ngOnInit() {
    this.startDate = this.course.date;
  }

}
