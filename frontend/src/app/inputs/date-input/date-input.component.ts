import { Component, forwardRef, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

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
export class DateInputComponent implements OnInit, OnDestroy {
  @Input() addCourseForm: FormGroup;
  @Output() type = new EventEmitter();
  public resetData = false;
  private subscriptionDate: Subscription;

  constructor(private formsService: FormsService) {
    this.subscriptionDate = formsService.resetForm().subscribe(data => this.resetData = data);
  }

  ngOnInit() {
    this.addCourseForm = new FormGroup({
      date: new FormControl(null, [Validators.required, ValidateDate])
    });
    console.log(this.addCourseForm);
  }

  ngOnDestroy(): void {
    this.subscriptionDate.unsubscribe();
  }

  public onType(value: string): void {
    // this.formsService.clearForm$.next(false);
    this.addCourseForm.controls.date.valid ? this.type.emit(value) : this.type.emit(null);
  }

}

// https://alligator.io/angular/custom-form-control/
