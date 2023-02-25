import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListPageComponent } from './job-list-page/job-list-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [JobListPageComponent],
  imports: [CommonModule, SharedModule],
})
export class JobListModule {}
