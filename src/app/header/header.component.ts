import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HeaderComponent implements OnInit {
  public title = 'Angular mentoring program Q4 2017';
  public username: string;
  public isAuthenticated: boolean;
  public isLogged: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLogged = authService.isLoggedIn();
    authService.changedUser().subscribe(data => this.username = data);
  }

  onLogout() {
    this.authService.logout();
    console.log('logged out');
  }

  ngOnInit() {
    this.username = this.authService.getUserInfo();
  }

}
