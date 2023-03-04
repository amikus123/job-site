import { JobFormComponent } from './../job-form/job-form.component';
import { SharedModule } from './../shared/shared.module';
import { ToastService } from './../services/toast/toast.service';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { AuthService } from './../services/auth/auth.service';
import { Observable } from 'rxjs';
import { FirestoreService } from './../services/firestore/firestore.service';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Currency, JobOffer, Salary } from '../utils/jobOffer';
import { getErrorFromForm } from '../utils/forms';

@Component({
  selector: 'app-edit-job',
  standalone: true,
  imports: [CommonModule, SharedModule, JobFormComponent],
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss'],
})
export class EditJobComponent {
  jobId: string = '';
  jobData$: Observable<JobOffer> | null = null;
  @ViewChild('formDirective') private formDirective: NgForm | undefined;

  form = this.formBuilder.group({
    jobTitle: new FormControl<string>('', {
      validators: [Validators.required, Validators.minLength(4)],
      nonNullable: true,
    }),
    salary: new FormControl<number>(1000, {
      validators: [Validators.required, Validators.min(1)],
      nonNullable: true,
    }),
    currency: new FormControl<Currency>('zl', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    salaryType: new FormControl<Salary>('brutto', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    jobDescription: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    location: new FormControl<string>('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  constructor(
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    public auth: AuthService,
    private formBuilder: FormBuilder,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.jobId = this.route.snapshot.paramMap.get('jobId') as string;
    const jobData$ = this.firestoreService.getJobOffer(this.jobId);
    this.jobData$ = jobData$;
    jobData$.subscribe(
      ({
        currency,
        jobDescription,
        jobTitle,
        location,
        salary,
        salaryType,
      }) => {
        this.form.setValue({
          currency,
          jobDescription,
          jobTitle,
          location,
          salary,
          salaryType,
        });
      }
    );
  }

  submit() {
    const newJobOfferData = {
      currency: this.form.value.currency as Currency,
      jobDescription: this.form.value.jobDescription,
      jobTitle: this.form.value.jobTitle,
      location: this.form.value.location,
      salary: this.form.value.salary,
      salaryType: this.form.value.salaryType as Salary,
    } as JobOffer;
    console.log(this.firestoreService, 'XD');
    this.firestoreService
      .modifyJobOffer(this.jobId, newJobOfferData)
      .then(() => {
        this.toastService.openToast('Job offer added');
        this.formDirective?.resetForm();
      })
      .catch((e) => {
        console.error(e);
        this.toastService.openToast('Something went wrong :(');
      });
  }

  getError(formControl: FormControl<string | number | boolean | null>) {
    return getErrorFromForm(formControl);
  }
}
