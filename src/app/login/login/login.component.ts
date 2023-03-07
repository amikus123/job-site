import { ToastService } from './../../services/toast/toast.service';
import { setErrors } from './../../utils/forms';
import { CommonModule } from '@angular/common';
import { GenericLoginComponent } from '../generic-form/generic-form.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-employer-login',
  standalone: true,
  imports: [SharedModule, GenericLoginComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}
  form = this.formBuilder.group(
    {
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
        nonNullable: true,
      }),
    },
    {}
  );
  employerGoogleLogin = () => {
    this.auth.googleAuth(true).then(() => {
      this.toastService.openToast('Login was succesful');
    });
  };
  private async singInEmployer(email: string, passowrd: string) {
    return await this.auth.signIn(email, passowrd);
  }
  submit = async () => {
    const formValues = this.form.value;
    const errorCode = await this.singInEmployer(
      formValues.email || '',
      formValues.password || ''
    );
    if (errorCode !== null) {
      setErrors(errorCode, this.form.controls);
    } else {
      this.toastService.openToast('Login was succesful');
    }
  };
}
