import { Component, OnInit, style } from '@angular/core';
import template from './search-toolbox.component.html';
import styles from './search-toolbox.component.css';

@Component({
  selector: 'app-search-toolbox',
  template,
  styles: [styles]
})
export class SearchToolboxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
