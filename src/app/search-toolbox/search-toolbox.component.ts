import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-toolbox',
  templateUrl: './search-toolbox.component.html',
  styleUrls: ['./search-toolbox.component.css']
})

export class SearchToolboxComponent implements OnInit {
  @Input() searchString;
  // @Output() search = new EventEmitter();

  constructor() { }

  onSearch() {
    console.log(this.searchString);
    // this.search.emit(this.searchString);
  }

  ngOnInit() {
  }

}
