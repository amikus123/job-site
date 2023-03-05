import { SharedModule } from './../shared/shared.module';
import { Observable } from 'rxjs';
import { JobOfferWithId } from './../utils/jobOffer';
import { FirestoreService } from './../services/firestore/firestore.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent {
  jobs$!: Observable<JobOfferWithId[]>;
  constructor(private firestore: FirestoreService) {}
  ngOnInit() {
    this.jobs$ = this.firestore.getAllJobs();
  }
}
