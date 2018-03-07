import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { CourseService } from '../services/course.service';
import { OrderByPipe } from '../pipes/orderBy.pipe';
import { store, filterCourses, resetFilter } from '../store';

@Component({
  selector: 'app-search-toolbox',
  templateUrl: './search-toolbox.component.html',
  styleUrls: ['./search-toolbox.component.css'],
  providers: [OrderByPipe],
})

export class SearchToolboxComponent {
  @Input() searchString;

  constructor(private courseService: CourseService) { }

  public onSearch() {
    /*
    this.courseService.search({term: this.searchString})
      .subscribe(results => {
        this.courseService.courses$.next(results);
        this.courseService.search$.next(true);
      });
    }
    */

    store.dispatch(filterCourses(this.searchString));

  }
  clearString() {
    this.searchString = '';

    /*
    this.courseService.getCourses({});
    this.courseService.search$.next(false);
    */

    store.dispatch(resetFilter());
  }
}

// https://alligator.io/angular/real-time-search-angular-rxjs/
