import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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
  @Output() check = new EventEmitter();
  public authors: Array<any> = [];
  public authorsForm: FormGroup;
  private selectedAuthors: Array<Author> = [];
  private subscription: ISubscription;

  // authors = [
  //   {id: 1, name: 'Author 1'},
  //   {id: 2, name: 'Author 2'},
  //   {id: 3, name: 'Author 3'},
  // ];

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.authorsForm = this.fb.group({
      // id: null,
      // name: null,
      checked: false,
      authors: new FormArray([]),
      selectedAuthors: new FormControl()
  });
  // this.authorsForm = new FormGroup({
  //   authors: new FormArray([]),
  //   // selectedAuthors: new FormControl(this.mapAuthors(formControlArray.value), Validators.required)
  // });

    this.subscription = this.courseService.getAuthors().subscribe(data => {
      this.authors = data;
    // });

    const group = [];

    this.authors.forEach(author => {
      group.push(this.fb.group({
        id: author.id,
        name: author.name,
        checked: false,
      }));
    });

    const formControlArray = new FormArray(group);

    this.authorsForm = new FormGroup({
      authors: formControlArray,
      selectedAuthors: new FormControl(this.mapAuthors(formControlArray.value), Validators.required)
    });

    formControlArray.valueChanges.subscribe(data => {
      debugger;
      this.authorsForm.controls.selectedAuthors.setValue(this.mapAuthors(data));
      console.log(this.authorsForm.controls.selectedAuthors);
    });
  });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public toggleCheckbox(idString: string) {
    const id = parseInt(idString, 10);
    debugger;
    this.authors
      .filter(data => data.id === id)
      .map(author => this.selectedAuthors.push({
        id: author.id,
        name: author.name
      }));
    this.check.emit(this.selectedAuthors);
  }

  private mapAuthors(authors) {
    debugger;
    const selectedAuthors = authors
      .filter(obj => obj.checked)
      .map(obj => obj.id);
    return selectedAuthors.length ? selectedAuthors : null;
  }

}
