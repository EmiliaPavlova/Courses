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
  private total = 0;
  private page = 1;
  private size = 3;

  constructor(private courseService: CourseService) { }

  public onSearch() {
    this.courseService.search({page: this.page, size: this.size, term: this.searchString})
      .subscribe(results => {
        this.total = results.length;
        this.courseService.courses$.next(results);
      });
  }
}

// https://alligator.io/angular/real-time-search-angular-rxjs/
