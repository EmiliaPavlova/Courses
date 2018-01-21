import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { CourseService } from '../services/course.service';
import { OrderByPipe } from '../pipes/orderBy.pipe';

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
    this.courseService.search({term: this.searchString})
      .subscribe(results => {
        this.courseService.courses$.next(results);
        this.courseService.search$.next(true);
      });
    }
    
    clearString() {
      this.searchString = '';
      this.courseService.getCourses(1);
      this.courseService.search$.next(false);
  }
}

// https://alligator.io/angular/real-time-search-angular-rxjs/
