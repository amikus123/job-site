import { errorCodes } from './../../services/auth/auth';
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
  employeeGoogleLogin = () => {
    this.auth.googleAuth(false);
  };
  private async singInEmployee(email: string, passowrd: string) {
    return await this.auth.signIn(email, passowrd, false);
  }
  submit = async () => {
    const formValues = this.form.value;
    console.log(
      formValues,
      this.employeeGoogleLogin,
      this.form.controls.email.errors
    );
    // if return
    const errorCode = await this.singInEmployee(
      formValues.email || '',
      formValues.password || ''
    );
    if (errorCode !== null) {
      if (
        errorCode === 'auth/invalid-email' ||
        errorCode === 'auth/email-already-exists'
      ) {
        this.form.controls.email.setErrors({
          firebaseError: errorCodes[errorCode],
        });
      } else if (errorCode === 'auth/invalid-password') {
        this.form.controls.password.setErrors({
          firebaseError: errorCodes[errorCode],
        });
      } else {
        this.form.controls.email.setErrors({
          firebaseError: 'Something went wrong',
        });
      }
    }
  };
}
