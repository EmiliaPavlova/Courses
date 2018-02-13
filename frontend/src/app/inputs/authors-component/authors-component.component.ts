import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CourseService } from '../../services/course.service';
import { Author } from '../../models/author';
import { ValidateAuthors } from '../../validators/authors.validator';

@Component({
  selector: 'app-authors-component',
  templateUrl: './authors-component.component.html',
  styleUrls: ['./authors-component.component.css']
})
export class AuthorsComponentComponent implements OnInit, OnDestroy {
  @Input() addCourseForm: FormGroup;
  @Input() selected: Array<Author>;
  @Output() check = new EventEmitter();

  public authors: Array<Author> = [];
  public authorChecked = false;
  private selectedAuthors: Array<Author> = [];
  private subscriptions: Array<Subscription> = [];

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.courseService.getAuthors().subscribe(data => {
      this.authors = data;

      const group = [];

      this.selected.forEach(author => {
        group.push(this.formBuilder.group({
          id: author.id,
          name: author.name,
        }));
      });
      // TODO: add custom validators for min length of authors
      this.addCourseForm.addControl('authors', new FormArray(group, [Validators.required, ValidateAuthors]));
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public isChecked(author) {
    debugger
    const a = this.selected.filter(this.arrIncludes(author)).length > 0
      ? true
      : null;
    console.log(a);
    return a;
  }

  public toggleCheckbox(author: Author) {
    this.authorChecked = true;
    const id = author.id;
    const authors = <FormArray>this.addCourseForm.get('authors');
    const checked = authors.value.filter(this.arrIncludes(author)).length > 0;
    if (checked) {
      const index = authors.value.findIndex(obj => obj.id === id);
      authors.removeAt(index);
    } else {
      authors.push(this.formBuilder.group({
        id: author.id,
        name: author.name,
      }));
    }
  }

  private arrIncludes(author): any {
    return (element) => element.id === author.id;
  }

}
