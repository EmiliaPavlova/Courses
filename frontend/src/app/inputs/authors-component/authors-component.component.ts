import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CourseService } from '../../services/course.service';
import { Author } from '../../models/author';

@Component({
  selector: 'app-authors-component',
  templateUrl: './authors-component.component.html',
  styleUrls: ['./authors-component.component.css']
})
export class AuthorsComponentComponent implements OnInit, OnDestroy {
  @Input() addCourseForm: FormGroup;
  @Input() selected: Array<any>;
  @Output() check = new EventEmitter();

  public authors: Array<any> = [];
  public resetData = false;

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
      this.addCourseForm.addControl('authors', new FormArray(group));

      // this.subscriptions.push(this.formsService.resetForm().subscribe(resetData => {
      //   if (resetData) {
      //     this.addCourseForm.controls.authors.value.forEach(author => author.checked = false);
      //     this.showErrorMessage = false;
      //     // this.addCourseForm.controls.selectedAuthors.reset();
      //     this.selectedAuthors = [];
      //   } else {
      //     this.subscriptions.push(formControlArray.valueChanges.subscribe(result => {
      //       this.addCourseForm.controls.selectedAuthors.setValue(this.mapAuthors(result));
      //     }));
      //   }
      // }));

    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  public isChecked(author) {
    return this.selected.filter(this.arrIncludes(author)).length > 0
      ? true
      : null;
  }

  public toggleCheckbox(author: Author) {
    const id = author.id;
    // this.authors
    //   .filter(data => data.id === id)
    //   .map(author => {
    //     const index = this.selectedAuthors.findIndex(obj => obj.id === id);
    //     index > -1
    //       ? this.selectedAuthors.splice(index, 1)
    //       : this.selectedAuthors.push({
    //         id: author.id,
    //         name: author.name
    //       });
    //     });

    // this.check.emit(this.selectedAuthors);
    // this.showErrorMessage = true;
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

  private showErrorMessage() {
    return this.addCourseForm.get('authors').value.length === 0;
  }

  private arrIncludes(author): any {
    return (element) => element.id === author.id;
  }

}
