import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPageComponent } from './job-page.component';

@NgModule({
  declarations: [JobPageComponent],
  imports: [CommonModule, SharedModule],
  exports: [JobPageComponent],
})
export class JobPageModule {}
