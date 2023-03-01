import { SharedModule } from 'src/app/shared/shared.module';
import { FirestoreService } from './../services/firestore/firestore.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from './../services/types';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getErrorFromForm } from '../utils/forms';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
})
export class AddJobComponent {
  constructor(
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private firestoreService: FirestoreService
  ) {}
  saveChanges() {
    // const newUserData = {
    //   ...this.auth.user$.value,
    //   username: this.form.value.username as string,
    //   isEmployer: this.form.value.isEmployer === 'true' ? true : false,
    // } as User;
    // this.firestoreService.setUserDataInDB(newUserData).then(() => {});
  }

  form = this.formBuilder.group({
    jobTitle: ['', [Validators.required, Validators.minLength(4)]],
    salary: [1000, [Validators.required, Validators.min(0)]],
    currency: ['zl'],
    salaryType: ['brutto', [Validators.required]],
    jobDescription: ['', [Validators.required]],
    location: ['', [Validators.required]],
  });

  getError(formControl: FormControl<string | number | boolean | null>) {
    return getErrorFromForm(formControl);
  }
}
