import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';

import { CourseService } from '../../services/course.service';
import { Author } from '../../models/author';

@Component({
  selector: 'app-authors-component',
  templateUrl: './authors-component.component.html',
  styleUrls: ['./authors-component.component.css']
})
export class AuthorsComponentComponent implements OnInit, OnDestroy {
  @Output() check = new EventEmitter();
  public authors: Array<any> = [];
  private selectedAuthors: Array<Author> = [];
  private subscription: ISubscription;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.subscription = this.courseService.getAuthors().subscribe(data => {
      this.authors = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleCheckbox(data: string) {
    const id = parseInt(data, 10);
    // debugger;
    this.authors
      .filter(data => data.id === id && data.isChecked)
      .map(author => this.selectedAuthors.push({
        id: author.id,
        firstName: author.firstName,
        lastName: author.lastName
      }));
    this.check.emit(this.selectedAuthors);
  }

}
