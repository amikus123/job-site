import { AuthService } from './../services/auth/auth.service';
import { FirestoreService } from './../services/firestore/firestore.service';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';

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
    'actions',
  ];
  dataSource: MatTableDataSource<any, MatTableDataSourcePaginator> | null =
    null;

  constructor(private firestore: FirestoreService, private auth: AuthService) {}

  async ngAfterViewInit() {
    const res = await this.firestore.getUserJobOffers(
      this.auth.user$.value?.uid || ''
    );

    res.subscribe((e) => {
      console.log(e);
      this.dataSource = new MatTableDataSource<any>(e);
    });
  }
}
