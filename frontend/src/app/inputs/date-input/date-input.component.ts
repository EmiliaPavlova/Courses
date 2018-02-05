import { Component, forwardRef, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormsService } from '../../services/forms.service';
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
export class DateInputComponent implements OnInit {
  @Input() addCourseForm: FormGroup;
  @Output() type = new EventEmitter();
  public resetData = false;

  constructor(private formsService: FormsService) {
    formsService.resetForm().subscribe(data => this.resetData = data);
  }

  ngOnInit() {
    this.addCourseForm = new FormGroup({
      date: new FormControl(null, [Validators.required, ValidateDate])
    });
  }

  public onType(value: string): void {
    this.formsService.clearForm$.next(false);
    this.addCourseForm.controls.date.valid ? this.type.emit(value) : this.type.emit(null);
  }

}

// https://alligator.io/angular/custom-form-control/
