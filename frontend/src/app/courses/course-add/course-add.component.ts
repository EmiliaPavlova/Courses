import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import dateFormat from 'dateformat';

import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { ValidateDate } from '../../validators/date.validator';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {
  public addCourseForm: FormGroup;
  public courseFormControls: FormArray;
  public course: Course;
  public duration: number;
  public selectedAuthors: Array<any> = [];

  private date: string;
  private authors: Array<string>;
  private addedCourses: Array<Course> = [];
  private isEditMode = false;
  private defaultValues: any = {
    title: '',
    description: '',
    date: '',
    duration: null,
    authors: new FormArray([]),
  };

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }


  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.courseService.getCourseById(id).subscribe(course => {
        this.course = course[0];
        this.isEditMode = true;
        this.buildForm(this.course);
        this.selectedAuthors = this.course.authors || [];
      });
    }
    this.buildForm();
  }
  public onReset(): void {
    this.courseFormControls.reset();
  }

  public onSubmit(): void {
    if (this.addCourseForm.valid) {
      this.addedCourses.push(this.addCourseForm.value);
      this.isEditMode
        ? this.courseService.editCourse(parseInt(this.route.snapshot.paramMap.get('id'), 10), this.addCourseForm.value)
        : this.courseService.addCourse(this.addCourseForm.value);
      console.log('New courses: ', this.addedCourses);

      this.clearFormArray(<FormArray>this.addCourseForm.get('authors'));
      this.addCourseForm.reset(this.defaultValues);
      this.selectedAuthors = [];

      this.router.navigate(['/courses']);
    }
  }

  public onDate(date): void {
    this.date = date;
  }

  public onDuration(duration): void {
    this.duration = duration;
  }

  public onCheck(authors): void {
    this.authors = authors;
  }

  private buildForm(formValues: any = {}) {
    this.addCourseForm = this.formBuilder.group({
      title: [formValues.name || '', [Validators.required, Validators.maxLength(50)]],
      description: [formValues.description || '', [Validators.required, Validators.maxLength(500)]],
      date: [(formValues.date ? dateFormat(formValues.date, 'dd/mm/yyyy') : ''), [Validators.required, ValidateDate]],
      duration: [formValues.duration || '', [Validators.required, Validators.pattern('[0-9]*')]],
    });
  }
  private clearFormArray(formArray: FormArray): FormArray {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
    return formArray;
  }

  // private checkValidationOfForm(): any {
  //   const result = {};
  //   Object.keys(this.addCourseForm.controls).forEach(control => {
  //     result[control] = this.addCourseForm.get(control).valid;
  //   });
  //   return result;
  // }
}
