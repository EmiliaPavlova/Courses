import { Component, Input, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CourseService } from '../services/course.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {
  public title = 'Angular mentoring program Q4 2017';
  public username: string;
  public isLogged: Observable<boolean>;
  public editedCourseName: string;

  private subscription: Subscription;

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private ref: ChangeDetectorRef
  ) {
    this.subscription = courseService.showCourseName().subscribe(name => {
      this.editedCourseName = name;
      this.ref.detectChanges();
    });
    console.log('editedCourseName', this.editedCourseName);
  }

  onLogout() {
    this.authService.logout();
    console.log('logged out');
  }

  ngOnInit() {
    this.username = this.authService.getUserInfo();
    this.isLogged = this.authService.isLoggedIn();
    this.authService.changedUser().subscribe(data => this.username = data);
  }

}
