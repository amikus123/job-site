import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  providers: [],
})
export class SharedModule {}
