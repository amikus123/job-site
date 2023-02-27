import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    FormsModule,

    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    CommonModule,
  ],
  declarations: [],
  exports: [FormsModule, ReactiveFormsModule, RouterModule, MaterialModule],
  providers: [],
})
export class SharedModule {}
