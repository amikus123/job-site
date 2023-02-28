import { errorCodes } from '../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { GenericLoginComponent } from '../generic-form/generic-form.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-login',
  standalone: true,
  imports: [SharedModule, GenericLoginComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(private auth: AuthService, private formBuilder: FormBuilder) {}
  form = this.formBuilder.group(
    {
      email: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      isEmployer: ['false', [Validators.required]],
    },
    {}
  );
  employeeGoogleLogin = () => {
    this.auth.googleAuth(this.form.value.isEmployer === 'false' ? false : true);
  };
  private async signUp(email: string, passowrd: string, username: string) {
    return await this.auth.signUp(
      email,
      passowrd,
      username,
      this.form.value.isEmployer === 'false' ? false : true
    );
  }
  submit = async () => {
    const formValues = this.form.value;
    const errorCode = await this.signUp(
      formValues.email || '',
      formValues.password || '',
      formValues.username || ''
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