import { NgModule } from '@angular/core';
import { JobListPageComponent } from './job-list-page/job-list-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [JobListPageComponent],
  imports: [SharedModule],
})
export class JobListModule {}
