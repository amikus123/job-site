import { FirestoreService } from './../services/firestore/firestore.service';
import { User } from '../services/types';
import { FormBuilder, Validators } from '@angular/forms';
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
    this.firestoreService.setUserData(newUserData).then(() => {
      console.log('yippie');
    });
  }

  form = this.formBuilder.group({
    username: ['', [Validators.required]],
    isEmployer: ['false', [Validators.required]],
  });
}
