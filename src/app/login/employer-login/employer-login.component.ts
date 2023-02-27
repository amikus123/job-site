import { errorCodes } from './../../services/auth/auth';
import { CommonModule } from '@angular/common';
import { GenericLoginComponent } from './../generic-login/generic-login.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-employer-login',
  standalone: true,
  imports: [SharedModule, GenericLoginComponent, CommonModule],
  templateUrl: './employer-login.component.html',
  styleUrls: ['./employer-login.component.scss'],
})
export class EmployerLoginComponent {
  constructor(private auth: AuthService, private formBuilder: FormBuilder) {}
  form = this.formBuilder.group(
    {
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    },
    {}
  );
  employerGoogleLogin = () => {
    this.auth.googleAuth(true);
  };
  private async singInEmployer(email: string, passowrd: string) {
    return await this.auth.signIn(email, passowrd, true);
  }
  submit = async () => {
    const formValues = this.form.value;
    const errorCode = await this.singInEmployer(
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
