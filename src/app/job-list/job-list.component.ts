import { Employer, Employee, User } from './../services/types';
import { ToastService } from './../services/toast/toast.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedModule } from './../shared/shared.module';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { JobOfferWithId } from './../utils/jobOffer';
import { FirestoreService } from './../services/firestore/firestore.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobCardComponent } from '../job-card/job-card.component';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, SharedModule, JobCardComponent],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent {
  data$!: Observable<[JobOfferWithId[], User[]]>;
  user: User | null | undefined;
  constructor(public firestore: FirestoreService, private auth: AuthService) {}
  ngOnInit() {
    this.data$ = this.firestore.getAllJobs();
    this.user = this.auth.user$.value;
  }
}
