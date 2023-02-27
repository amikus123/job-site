import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { JobPageComponent } from './job-page.component';

@NgModule({
  declarations: [JobPageComponent],
  imports: [SharedModule],
  exports: [JobPageComponent],
})
export class JobPageModule {}
