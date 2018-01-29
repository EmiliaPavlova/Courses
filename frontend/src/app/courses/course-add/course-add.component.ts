import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  addCourseForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addCourseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  public onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); // true or false
    console.log(form.value);
  }

  public onType(date) {
    this.addCourseForm.value.date = date;
  }

}
