import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import template from './course-detail.component.html';
import styles from './course-detail.component.css';

@Component({
  selector: 'app-course-detail',
  template,
  styles: [styles]
})
export class CourseDetailComponent implements OnInit {
  @Input() courseDetail;
  @Output() delete = new EventEmitter();

  constructor() { }

  onDelete() {
    console.log('deleted');
    this.delete.emit(this.courseDetail);
  }

  ngOnInit() {
  }

}
