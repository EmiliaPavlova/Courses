import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { OrderByPipe } from '../pipes/orderBy.pipe';

@Component({
  selector: 'app-search-toolbox',
  templateUrl: './search-toolbox.component.html',
  styleUrls: ['./search-toolbox.component.css'],
  providers: [OrderByPipe]
})

export class SearchToolboxComponent implements OnInit {
  @Input() searchString;

  constructor(private courseService: CourseService) { }

  onSearch() {
    this.courseService.filterCourses(this.searchString);
  }

  ngOnInit() {
  }

}
