import { CommonModule } from '@angular/common';
import { GenericLoginComponent } from './../generic-login/generic-login.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-login',
  standalone: true,
  imports: [SharedModule, GenericLoginComponent, CommonModule],
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss'],
})
export class EmployeeLoginComponent {
  constructor(private auth: AuthService, private formBuilder: FormBuilder) {}
  form = this.formBuilder.group(
    {
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    },
    {}
  );
  employeeGoogleLogin() {
    this.auth.googleAuth(false);
  }
  private singInEmployee(email: string, passowrd: string) {
    console.log('!!!');
    this.auth.signIn(email, passowrd, false);
  }
  submit = () => {
    const formValues = this.form.value;
    console.log(formValues, this.employeeGoogleLogin);
    this.singInEmployee(formValues.email || '', formValues.password || '');
  };
}
