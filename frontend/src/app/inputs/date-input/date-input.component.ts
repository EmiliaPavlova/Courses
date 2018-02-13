import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ValidateDate } from '../../validators/date.validator';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateInputComponent),
      multi: true
    }
  ]
})
export class DateInputComponent {
  @Input() addCourseForm: FormGroup;
  @Output() type = new EventEmitter();

  constructor() { }

  public onType(value: string): void {
    this.addCourseForm.controls.date.valid ? this.type.emit(value) : this.type.emit(null);
  }

}

// https://alligator.io/angular/custom-form-control/
