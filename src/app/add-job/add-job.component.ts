import { Salary, Currency } from './../utils/jobOffer';
import { SharedModule } from 'src/app/shared/shared.module';
import { FirestoreService } from './../services/firestore/firestore.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { User } from './../services/types';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getErrorFromForm } from '../utils/forms';
import { JobOffer } from '../utils/jobOffer';
import { ToastService } from '../services/toast/toast.service';

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
    private firestoreService: FirestoreService,
    private toastService: ToastService
  ) {}
  @ViewChild('formDirective') private formDirective: NgForm | undefined;

  submit() {
    const newJobOfferData = {
      currency: this.form.value.currency as Currency,
      jobDescription: this.form.value.jobDescription,
      jobTitle: this.form.value.jobTitle,
      location: this.form.value.location,
      salary: this.form.value.salary,
      salaryType: this.form.value.salaryType as Salary,
      authorUid: this.auth.user$.value?.uid || '',
    } as JobOffer;
    this.firestoreService
      .createJobOffer(newJobOfferData)
      .then(() => {
        this.toastService.openToast('Job offer added');
        this.formDirective?.resetForm();
      })
      .catch((e) => {
        console.error(e);
        this.toastService.openToast('Something went wrong :(');
      });
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
