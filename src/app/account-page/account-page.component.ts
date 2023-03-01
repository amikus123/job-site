import { FirestoreService } from './../services/firestore/firestore.service';
import { User } from '../services/types';
import {
  FormBuilder,
  Validators,
  FormControl,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent {
  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService
  ) {}
  ngOnInit() {
    this.auth.user$?.subscribe((val) => {
      this.form.setValue({
        username: val?.username || '',
        isEmployer: val?.isEmployer ? 'true' : 'false',
      });
    });
  }
  saveChanges() {
    const newUserData = {
      ...this.auth.user$.value,
      username: this.form.value.username as string,
      isEmployer: this.form.value.isEmployer === 'true' ? true : false,
    } as User;
    this.firestoreService.setUserDataInDB(newUserData).then(() => {});
  }

  form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    isEmployer: ['false', [Validators.required]],
  }) as FormGroup<{
    username: FormControl<string>;
    isEmployer: FormControl<string>;
  }>;

  getError(formControl: FormControl<string>) {
    const errors = formControl.errors as ValidationErrors;
    const firstError = Object.entries(errors)[0];
    if (firstError[0] === 'firebaseError') {
      return firstError[1];
    } else if (firstError[0] === 'required') {
      return 'Field is required';
    } else if (firstError[0] === 'minlength') {
      return `Field should be at least ${firstError[1].requiredLength} characters long`;
    } else if (firstError[0] === 'email') {
      return 'Enter valid email';
    } else {
      return 'idk';
    }
  }
}
