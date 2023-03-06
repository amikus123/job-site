import { User } from './../services/types';
import { JobOfferWithId } from './../utils/jobOffer';
import { JobCardComponent } from './../job-card/job-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastService } from './../services/toast/toast.service';
import { AuthService } from './../services/auth/auth.service';
import { Observable } from 'rxjs';
import { FirestoreService } from './../services/firestore/firestore.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobOffer } from '../utils/jobOffer';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule, SharedModule, JobCardComponent],
  templateUrl: './my-applications.component.html',
  styleUrls: ['./my-applications.component.scss'],
})
export class MyApplicationsComponent {
  jobOffers$!: Observable<[JobOfferWithId[], User[]]>;
  user: User | null | undefined;

  constructor(
    private firestore: FirestoreService,
    private auth: AuthService,
    private toastService: ToastService
  ) {}
  ngOnInit() {
    this.jobOffers$ = this.firestore.getJobsUserApplied(
      this.auth.user$.value?.uid || ''
    );
    this.user = this.auth.user$.value;
  }
}
