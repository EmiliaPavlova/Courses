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
  private date: string;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addCourseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  public onSubmit(form: FormGroup) {
    this.addCourseForm.value.date = this.date;
    this.addCourseForm.value.duration = this.duration;
    console.log('Valid?', form.valid); // true or false
    console.log(form.value);
  }

  public onDate(date) {
    this.date = date;
  }

  public onDuration(duration) {
    this.duration = duration;
  }

}
