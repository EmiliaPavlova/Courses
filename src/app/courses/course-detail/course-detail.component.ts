import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  @Input() course;
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor() { }

  onEdit() {
    console.log('edited');
    this.edit.emit(this.course);
  }

  onDelete() {
    console.log('deleted');
    this.delete.emit(this.course);
  }

  ngOnInit() {
  }

}
