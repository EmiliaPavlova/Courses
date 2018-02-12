import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import dateFormat from 'dateFormat';

import { CourseService } from '../../services/course.service';
import { FormsService } from '../../services/forms.service';
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
    private formsService: FormsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }


  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.courseService.getCourseById(id).subscribe(course => {
        this.course = course[0];
        // this.isEditMode = true;
        this.buildForm(this.course);
        this.selectedAuthors = this.course.authors || [];
      });
    }
    this.buildForm();
  }

  private buildForm(formValues: any = {}) {
    this.addCourseForm = this.formBuilder.group({
      title: [formValues.name || '', [Validators.required, Validators.maxLength(50)]],
      description: [formValues.description || '', [Validators.required, Validators.maxLength(500)]],
      date: [dateFormat(formValues.date, 'dd/mm/yyyy') || '', [Validators.required, ValidateDate]],
      duration: [formValues.duration || '', [Validators.required, Validators.pattern('[0-9]*')]],
    });
  }
  private clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }
  public onReset() {
    this.courseFormControls.reset();
  }

  public onSubmit() {
    if (this.addCourseForm.valid) {
      this.addedCourses.push(this.addCourseForm.value);
      console.log('New courses: ', this.addedCourses);

      this.clearFormArray(<FormArray>this.addCourseForm.get('authors'));
      this.addCourseForm.reset(this.defaultValues);
      this.selectedAuthors = [];
      // this.applyValidators()

      // TODO: call corresponding api method
      // this.router.navigate(['/courses']);
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

  private checkValidationOfForm(): any {
    const result = {};
    Object.keys(this.addCourseForm.controls).forEach(control => {
      result[control] = this.addCourseForm.get(control).valid;
    });
    return result;
  }
}

// http://brophy.org/post/nested-reactive-forms-in-angular2/
// https://www.lynda.com/AngularJS-tutorials/FormControl/461451/570542-4.html?srchtrk=index%3a3%0alinktypeid%3a2%0aq%3aangular+forms%0apage%3a1%0as%3arelevance%0asa%3atrue%0aproducttypeid%3a2
