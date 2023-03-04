import { getErrorFromForm } from './../utils/forms';
import { SharedModule } from './../shared/shared.module';
import { Salary, Currency } from './../utils/jobOffer';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss'],
})
export class JobFormComponent {
  @Input('form') form: FormGroup<{
    jobTitle: FormControl<string>;
    salary: FormControl<number>;
    currency: FormControl<Currency>;
    salaryType: FormControl<Salary>;
    jobDescription: FormControl<string>;
    location: FormControl<string>;
  }> | null = null;
  @Input('submit') submit = () => {};

  getError(formControl: FormControl<string | number | boolean | null>) {
    return getErrorFromForm(formControl);
  }
}
