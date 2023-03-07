import { AuthService } from 'src/app/services/auth/auth.service';
import { JobCardComponent } from './../../job-card/job-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Observable } from 'rxjs';
import { JobOffer } from './../../utils/jobOffer';
import { User } from './../../services/types';
import { FirestoreService } from './../../services/firestore/firestore.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-page',
  standalone: true,
  imports: [CommonModule, SharedModule, JobCardComponent],
  templateUrl: './job-page.component.html',
  styleUrls: ['./job-page.component.scss'],
})
export class JobPageComponent {
  data$?: Observable<[JobOffer, User[]]>;
  user: User | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private firestore: FirestoreService,
    private auth: AuthService
  ) {}
  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('jobId') as string;
    this.data$ = this.firestore.getJobForPage(jobId);
    this.user = this.auth.user$.value;
  }
}
