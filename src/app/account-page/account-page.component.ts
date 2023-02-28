import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { last } from 'rxjs';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss'],
})
export class AccountPageComponent {
  constructor(public auth: AuthService, private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.auth.user$?.subscribe((val) => {
      console.log(this.auth.firebaseUser);
      this.form.setValue({
        username: val?.username || '',
        isEmployer: val?.isEmployer ? 'true' : 'false',
      });
    });
  }
  submit() {}

  form = this.formBuilder.group({
    username: ['', [Validators.required]],
    isEmployer: ['false', [Validators.required]],
  });
}
