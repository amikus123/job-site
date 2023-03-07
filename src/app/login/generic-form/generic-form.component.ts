import { SharedModule } from '../../shared/shared.module';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { getErrorFromForm } from 'src/app/utils/forms';

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
  getError(formControl: FormControl<string>) {
    return getErrorFromForm(formControl);
  }
}
