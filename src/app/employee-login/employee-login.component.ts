import { SharedModule } from 'src/app/shared/shared.module';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-employee-login',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss'],
})
export class EmployeeLoginComponent {
  constructor(private auth: AuthService) {}

  employeeGoogleLogin() {
    this.auth.googleAuth(false);
  }
  singInEmployee(email: string, passowrd: string) {
    this.auth.signIn(email, passowrd, false);
  }
}
