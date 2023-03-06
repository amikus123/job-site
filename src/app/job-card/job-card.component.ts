import { BehaviorSubject, of } from 'rxjs';
import { ToastService } from './../services/toast/toast.service';
import { AuthService } from './../services/auth/auth.service';
import { FirestoreService } from './../services/firestore/firestore.service';
import { JobOffer } from './../utils/jobOffer';
import { SharedModule } from './../shared/shared.module';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../services/types';

@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.scss'],
})
export class JobCardComponent {
  @Input('job') job?: JobOffer;
  @Input('user') user?: User | null;
  @Input('users') users?: User[];
  hasClicked = false;
  constructor(
    public firestore: FirestoreService,
    private toastService: ToastService
  ) {}

  async ngOnInit() {}
  async click(jobId: string | undefined) {
    if (!this.user) {
      this.toastService.openToast('You are not logged in!');
    } else if (this.user.isEmployer) {
      this.toastService.openToast('Employers cant apply!');
    } else {
      const resposne = await this.firestore.addAplicationToJob(
        this.user.uid,
        jobId || ''
      );
      if (resposne === 'Already applied') {
        this.toastService.openToast('You have already applied!');
      } else if (resposne === 'Error') {
        this.toastService.openToast('An error has occured!');
      } else {
        this.toastService.openToast('You have applied for the job!');
        this.hasClicked = true;
      }
    }
  }
}
