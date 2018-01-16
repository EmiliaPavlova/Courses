import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CourseService } from '../services/course.service';
import { OrderByPipe } from '../pipes/orderBy.pipe';

@Component({
  selector: 'app-search-toolbox',
  templateUrl: './search-toolbox.component.html',
  styleUrls: ['./search-toolbox.component.css'],
  providers: [OrderByPipe],
  // changeDetection: ChangeDetectionStrategy.OnPush
})

export class SearchToolboxComponent implements OnInit {
  @Input() searchString;
  results: Object;
  // searchTerm$ = new Subject<string>();

  constructor(private courseService: CourseService) { }

  onSearch() {
    // this.courseService.filterCoursesByString(this.searchString);
    debugger
    this.courseService.search(this.searchString)
      // .subscribe(results => {
      //   this.results = results.results;
      // });
  }

  ngOnInit() {
  }

}

// https://alligator.io/angular/real-time-search-angular-rxjs/
