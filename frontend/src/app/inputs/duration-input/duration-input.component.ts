import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlValueAccessor } from '@angular/forms';
import { ISubscription } from 'rxjs/Subscription';

import { FormsService } from '../../services/forms.service';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.css']
})
export class DurationInputComponent implements OnInit, OnDestroy {
  @Input() addCourseForm: FormGroup;
  @Output() type = new EventEmitter();
  public resetData = false;
  private subscriptionDuration: ISubscription;

  constructor(private formsService: FormsService) {
    this.subscriptionDuration = formsService.resetForm().subscribe(data => this.resetData = data);
  }

  ngOnInit() {
    this.addCourseForm = new FormGroup({
      duration: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')])
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDuration.unsubscribe();
  }

  public onType(value): void {
    // this.formsService.clearForm$.next(false);
    this.addCourseForm.controls.duration.valid ? this.type.emit(value) : this.type.emit(null);
  }

}
