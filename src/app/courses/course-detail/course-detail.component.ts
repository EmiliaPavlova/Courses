import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  @Input() course;
  @Output() delete = new EventEmitter();

  constructor() { }

  onDelete() {
    console.log('deleted');
    this.delete.emit(this.course);
  }

  ngOnInit() {
  }

}
