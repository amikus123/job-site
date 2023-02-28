import { SharedModule } from '../../shared/shared.module';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-generic-form',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './generic-form.component.html',
  styleUrls: ['./generic-form.component.scss'],
})
export class GenericLoginComponent {
  constructor() {}
  @Input('isLogin') isLogin = false;
  @Input('form') form:
    | FormGroup<{
        email: FormControl<string>;
        passowrd: FormControl<string>;
        isEmployer?: FormControl<boolean>;
      }>
    | any;

  @Input('submit') submit = () => {};
  @Input('googleLogin') googleLogin = () => {};

  passwordMode = true;

  togglePassword() {
    this.passwordMode = !this.passwordMode;
  }
  // gets one of the field errors to display
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
