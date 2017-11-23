import { Component, OnInit } from '@angular/core';
import template from './header.component.html';
import styles from './header.component.css';

@Component({
  selector: 'app-header',
  template,
  styles: [styles]
})
export class HeaderComponent implements OnInit {

  title = 'Angular mentoring program Q4 2017';

  constructor() { }

  ngOnInit() {
  }

}
