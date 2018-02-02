import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ISubscription } from 'rxjs/Subscription';

import { CourseService } from '../../services/course.service';
import { Author } from '../../models/author';
import { ValidateAuthors } from '../../validators/authors.validator';

@Component({
  selector: 'app-authors-component',
  templateUrl: './authors-component.component.html',
  styleUrls: ['./authors-component.component.css']
})
export class AuthorsComponentComponent implements OnInit, OnDestroy {
  @Input() author: string;
  @Output() check = new EventEmitter();
  public authors: Array<any> = [];
  public authorsForm: FormGroup;
  private selectedAuthors: Array<Author> = [];
  private subscription: ISubscription;

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.subscription = this.courseService.getAuthors().subscribe(data => {
      this.authors = data;
    });
    this.authorsForm = new FormGroup({
      author: new FormControl(null, [Validators.required, ValidateAuthors])
    });
    debugger
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleCheckbox(idString: string) {
    const id = parseInt(idString, 10);
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
