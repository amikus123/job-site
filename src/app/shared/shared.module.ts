import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../filter.pipe';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    CommonModule,
  ],
  declarations: [FilterPipe],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FilterPipe,
  ],
  providers: [FilterPipe],
})
export class SharedModule {}
