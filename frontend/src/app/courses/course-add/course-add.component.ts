import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CourseService } from '../../services/course.service';
import { FormsService } from '../../services/forms.service';
import { Course } from '../../models/course';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  public addCourseForm: FormGroup;
  public course: Course;
  public duration: number;
  public isFormValid = false;

  private date: string;
  private authors: Array<string>;
  private addedCourses: Array<Course> = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private formsService: FormsService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.courseService.getCourseById(id).subscribe(course => {
        this.course = course[0];
        console.log(this.course);
        });
    }

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

    // TODO: call corresponding api method
    this.router.navigate(['/courses']);
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
