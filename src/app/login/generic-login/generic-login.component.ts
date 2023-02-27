import { SharedModule } from './../../shared/shared.module';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormControl, FormGroup } from '@angular/forms';

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
  passwordMode = true;

  togglePassword() {
    this.passwordMode = !this.passwordMode;
  }
}
