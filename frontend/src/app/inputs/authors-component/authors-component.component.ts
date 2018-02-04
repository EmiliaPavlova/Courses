import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators, ControlValueAccessor } from '@angular/forms';
import { ISubscription } from 'rxjs/Subscription';

import { CourseService } from '../../services/course.service';
import { Author } from '../../models/author';

@Component({
  selector: 'app-authors-component',
  templateUrl: './authors-component.component.html',
  styleUrls: ['./authors-component.component.css']
})
export class AuthorsComponentComponent implements OnInit, OnDestroy {
  @Input() addCourseForm: FormGroup;
  @Output() check = new EventEmitter();
  public authors: Array<any> = [];
  public showErrorMessage = false;
  private selectedAuthors: Array<Author> = [];
  private subscription: ISubscription;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.addCourseForm = this.fb.group({
      checked: false,
      authors: new FormArray([]),
      selectedAuthors: new FormControl()
    });

    this.subscription = this.courseService.getAuthors().subscribe(data => {
      this.authors = data;

      const group = [];

      this.authors.forEach(author => {
        group.push(this.fb.group({
          id: author.id,
          name: author.name,
          checked: false,
        }));
      });

      const formControlArray = new FormArray(group);

      this.addCourseForm = new FormGroup({
        authors: formControlArray,
        selectedAuthors: new FormControl(this.mapAuthors(formControlArray.value), Validators.required)
      });

      formControlArray.valueChanges.subscribe(result => {
        this.addCourseForm.controls.selectedAuthors.setValue(this.mapAuthors(result));
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleCheckbox(idString: string) {
    const id = parseInt(idString, 10);
    this.authors
      .filter(data => data.id === id)
      .map(author => {
        const index = this.selectedAuthors.findIndex(obj => obj.id === id);
        index > -1
        ? this.selectedAuthors.splice(index, 1)
        : this.selectedAuthors.push({
          id: author.id,
          name: author.name
        });
      });
    this.check.emit(this.selectedAuthors);
    this.showErrorMessage = true;
  }

  private mapAuthors(authors) {
    const selectedAuthors = authors
      .filter(obj => obj.checked)
      .map(obj => obj.id);
    return selectedAuthors.length ? selectedAuthors : null;
  }

}
