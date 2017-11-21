import { Component, OnInit } from '@angular/core';
import template from './footer.component.html';
import styles from './footer.component.css';

@Component({
  selector: 'app-footer',
  template,
  styles: [styles]
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
