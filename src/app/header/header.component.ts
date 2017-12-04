import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Input() username;
  title = 'Angular mentoring program Q4 2017';
  isAuthenticated = false;

  constructor(private authService: AuthService) { }

  onLogout() {
    this.authService.logout();
    console.log('logged out');
  }

  ngOnInit() {
    this.isAuthenticated = !!this.authService.isAuthenticated;
  }

}
