import { setErrors } from './../../utils/forms';
import { CommonModule } from '@angular/common';
import { GenericLoginComponent } from '../generic-form/generic-form.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

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
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      username: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        nonNullable: true,
      }),
      isEmployer: new FormControl<'false' | 'true'>('false', {
        validators: [Validators.required],
        nonNullable: true,
      }),
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
    console.log({ errorCode });
    if (errorCode !== null) {
      setErrors(errorCode, this.form.controls);
    }
  };
}
