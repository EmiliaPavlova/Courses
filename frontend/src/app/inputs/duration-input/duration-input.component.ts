import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.css']
})
export class DurationInputComponent implements OnInit {
  @Input() duration: number;
  @Output() type = new EventEmitter();
  addCourseForm: FormGroup;

  constructor() { }

  ngOnInit() {
    // debugger
    this.addCourseForm = new FormGroup({
      duration: new FormControl(null, [Validators.required, Validators.pattern('[0-9]*')])
    });
  }

  public onType(value): void {
    console.log(this.addCourseForm.controls.duration);
    this.type.emit(value);
  }

}
