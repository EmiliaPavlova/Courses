import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() username;
  @Input() password;

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.username, this.password);
    console.log(`logged ${this.username}`)
    this.init();
  }
  
  init() {
    this.username = '';
    this.password = '';
  }

  ngOnInit() {
    this.init();
  }

}
