import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsService } from '../../services/forms.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  public addCourseForm: FormGroup;
  public duration: number;
  public isFormValid = false;
  private date: string;
  private authors: Array<string>;
  private addedCourses: Array<Course> = [];

  constructor(
    private formsService: FormsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addCourseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  public onSubmit(form: FormGroup) {
    // this.checkForm();
    this.addCourseForm.value.date = this.date;
    this.addCourseForm.value.duration = this.duration;
    this.addCourseForm.value.authors = this.authors;
    this.addedCourses.push(form.value);
    console.log('New courses: ', this.addedCourses);
    this.addCourseForm.reset();
    this.formsService.clearForm$.next(true);
  }

  public onDate(date): void {
    this.date = date;
    this.checkForm();
  }

  public onDuration(duration): void {
    this.duration = duration;
    this.checkForm();
  }

  public onCheck(authors): void {
    this.authors = authors;
    this.checkForm();
  }

  private checkForm(): boolean {
    this.isFormValid = this.addCourseForm.valid && !!this.date && !!this.duration && (!!this.authors && !!this.authors.length);
    return this.isFormValid;
  }

}

// http://brophy.org/post/nested-reactive-forms-in-angular2/
