import { AuthService } from './../services/auth/auth.service';
import { FirestoreService } from './../services/firestore/firestore.service';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { ToastService } from '../services/toast/toast.service';

@Component({
  selector: 'app-my-jobs',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss'],
})
export class MyJobsComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'jobTitle',
    'salary',
    'currency',
    'salaryType',
    'jobDescription',
    'location',
    'applications',
    'id',
  ];
  dataSource!: MatTableDataSource<any, MatTableDataSourcePaginator>;

  constructor(
    private firestore: FirestoreService,
    private auth: AuthService,
    private toastService: ToastService
  ) {}

  async ngAfterViewInit() {
    const res = await this.firestore.getUserJobOffers(
      this.auth.user$.value?.uid || ''
    );

    res.subscribe((e) => {
      // console.log(e);
      this.dataSource = new MatTableDataSource<any>(e);
    });
  }

  removeButton(jobId: string) {
    this.firestore
      .deleteJobOfffer(jobId)
      .then(() => {
        this.toastService.openToast('Deleted job offer');
      })
      .catch((e) => {
        this.toastService.openToast('Something went wrong');
        console.error(e);
      });
  }
}
