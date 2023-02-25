import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPageComponent } from './job-page/job-page.component';
import { JobPageModule } from './job-page/job-page.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, JobPageModule],
  exports: [JobPageModule],
})
export class JobModule {}
