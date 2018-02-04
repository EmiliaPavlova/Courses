import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlValueAccessor } from '@angular/forms';


@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.css']
})
export class DurationInputComponent implements OnInit {
  @Input() duration: number;
  @Input() addCourseForm: FormGroup;
  @Output() type = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.addCourseForm = new FormGroup({
      duration: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')])
    });
  }

  public onType(value): void {
    this.addCourseForm.controls.duration.valid ? this.type.emit(value) : this.type.emit(null);
  }

}
