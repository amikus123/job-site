import { SharedModule } from './../../shared/shared.module';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-generic-login',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './generic-login.component.html',
  styleUrls: ['./generic-login.component.scss'],
})
export class GenericLoginComponent {
  constructor() {}
  @Input('isEmployer') isEmployer = false;
  @Input('form') form:
    | FormGroup<{
        email: FormControl<string>;
        passowrd: FormControl<string>;
      }>
    | any;

  @Input('submit') submit = () => {};
  @Input('googleLogin') googleLogin = () => {};

  passwordMode = true;

  togglePassword() {
    this.passwordMode = !this.passwordMode;
  }
  // get one of the field errors
  getError(formControl: FormControl<string>) {
    const errors = formControl.errors as ValidationErrors;
    const firstError = Object.entries(errors)[0];
    if (firstError[0] === 'firebaseError') {
      return firstError[1];
    } else if (firstError[0] === 'required') {
      return 'Field is required';
    } else if (firstError[0] === 'minlength') {
      return 'Passowrd should be at least 6 characters long';
    } else {
      return 'idk';
    }
  }
}
