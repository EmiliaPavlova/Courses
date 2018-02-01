import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addCourseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  public onSubmit(form: FormGroup) {
    this.addCourseForm.value.date = this.date;
    this.addCourseForm.value.duration = this.duration;
    this.addCourseForm.value.authors = this.authors;
    console.log(form.value);
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
    this.isFormValid = this.addCourseForm.valid && !!this.date && !!this.duration && !!this.authors && !!this.authors.length;
    return this.isFormValid;
  }

}
