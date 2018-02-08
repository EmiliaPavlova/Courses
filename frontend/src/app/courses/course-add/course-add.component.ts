import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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
  public courseFormControls: FormArray;
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
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (id) {
      this.courseService.getCourseById(id).subscribe(course => {
        this.course = course[0];
        console.log(this.course);
        });
    }

    this.addCourseForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  private buildForm() {
    this.addCourseForm = this.formBuilder.group({
      title: this.formBuilder.control(null),
      description: this.formBuilder.control(null),
      date: this.formBuilder.control(null),
      duration: this.formBuilder.control(null),
      authors: this.formBuilder.array([
        this.formBuilder.group({
          id: this.formBuilder.control(null),
          name: this.formBuilder.control(null),
          checked: this.formBuilder.control(null),
        })
      ])
    });
    this.courseFormControls = this.addCourseForm.get('authors') as FormArray;
  }

  private onAddRequest() {
    this.courseFormControls.push(this.formBuilder.control(null));
  }

  private onRemoveRequest(index) {
    this.courseFormControls.removeAt(index);
  }

  public onSubmit(form: FormGroup) {
    this.addCourseForm.value.date = this.date || this.course.date;
    this.addCourseForm.value.duration = this.duration || this.course.duration;
    this.addCourseForm.value.authors = this.authors || this.course.authors;

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
    debugger;
    this.isFormValid = this.addCourseForm.valid &&
      !!this.addCourseForm.value.date &&
      !!this.addCourseForm.value.duration &&
      (!!this.addCourseForm.value.authors && !!this.addCourseForm.value.authors.length);
    return this.isFormValid;
  }

}

// http://brophy.org/post/nested-reactive-forms-in-angular2/
// https://www.lynda.com/AngularJS-tutorials/FormControl/461451/570542-4.html?srchtrk=index%3a3%0alinktypeid%3a2%0aq%3aangular+forms%0apage%3a1%0as%3arelevance%0asa%3atrue%0aproducttypeid%3a2
