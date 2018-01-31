import { Component, forwardRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
export class DateInputComponent implements OnInit  {
  @Input() date: string;
  @Output() type = new EventEmitter();
  public dateForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.dateForm = new FormGroup({
      date: new FormControl(null, [Validators.required, ValidateDate])
    });
  }

  public onType(value: string): void {
    this.type.emit(value);
  }

}

// https://alligator.io/angular/custom-form-control/
