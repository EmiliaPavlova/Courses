import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css']
})
export class DateInputComponent implements OnInit {
  @Input() date: string;
  @Output() type = new EventEmitter();
  addCourseForm: FormGroup;

  constructor() { }

  ngOnInit() {
    // debugger
    this.addCourseForm = new FormGroup({
      date: new FormControl(null, [Validators.required, Validators.pattern('^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$')])
    });
  }

  public onType(value): void {
    console.log(this.addCourseForm.controls.date);
    this.type.emit(value);
  }

}

// https://alligator.io/angular/custom-form-control/
