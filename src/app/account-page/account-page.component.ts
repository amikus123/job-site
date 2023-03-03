import { ToastService } from './../services/toast/toast.service';
import { FirestoreService } from './../services/firestore/firestore.service';
import { User } from '../services/types';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getErrorFromForm } from '../utils/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent {
  subscription: Subscription = new Subscription();
  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService,
    private toastService: ToastService
  ) {}
  ngOnInit() {
    this.subscription = this.auth.user$?.subscribe((val) => {
      this.form.setValue({
        username: val?.username || '',
        isEmployer: val?.isEmployer ? 'true' : 'false',
      });
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  saveChanges() {
    const newUserData = {
      ...this.auth.user$.value,
      username: this.form.value.username as string,
      isEmployer: this.form.value.isEmployer === 'true' ? true : false,
    } as User;
    this.firestoreService
      .setUserDataInDB(newUserData)
      .then(() => {
        this.toastService.openToast('Changes saved');
      })
      .catch((e) => {
        console.error(e);
        this.toastService.openToast('Something went wrong :(');
      });
  }

  form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    isEmployer: ['false', [Validators.required]],
  }) as FormGroup<{
    username: FormControl<string>;
    isEmployer: FormControl<string>;
  }>;
  isFormDiffrentFromUser() {}
  getError(formControl: FormControl<string | number | boolean | null>) {
    return getErrorFromForm(formControl);
  }
}
