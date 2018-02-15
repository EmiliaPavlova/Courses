import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlValueAccessor } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.css']
})
export class DurationInputComponent {
  @Input() addCourseForm: FormGroup;
  @Output() type = new EventEmitter();

  constructor() { }

  public onType(value): void {
    this.addCourseForm.controls.duration.valid ? this.type.emit(value) : this.type.emit(null);
  }

}
