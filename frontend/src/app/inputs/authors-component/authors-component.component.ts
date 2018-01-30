import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../services/course.service';
import { Author } from '../../models/author';

@Component({
  selector: 'app-authors-component',
  templateUrl: './authors-component.component.html',
  styleUrls: ['./authors-component.component.css']
})
export class AuthorsComponentComponent implements OnInit {
  public authors: Array<Author> = [];

  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.courseService.getAuthors().subscribe(data => {
      this.authors = data;
    });
  }

}
