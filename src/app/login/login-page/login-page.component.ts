import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private auth: AuthService) {}
  user$: any;

  ngOnInit() {
    this.user$ = this.auth.user$;
  }
  googleAuth() {
    this.auth.googleAuth();
  }
  signUpEmail(email: string, password: string) {
    this.auth.signUpEmail(email, password);
  }
}
