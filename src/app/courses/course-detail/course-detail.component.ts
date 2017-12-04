import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  @Input() course;
  @Output() edit = new EventEmitter();

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

  ngOnInit() {
  }

}
