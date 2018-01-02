import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public username;
  public password;

  constructor(private authService: AuthService) { }

  onLogin() {
    this.authService.login(this.username, this.password);
    console.log(`logged ${this.username}`);
    this.authService.isLoggedUser$.next(true);
    this.authService.changedUser$.next(this.username);
    this.init();
  }

  init() {
    this.username = '';
    this.password = '';
  }

  ngOnInit() {
    this.username = this.authService.getUserInfo();
    this.init();
  }

}
