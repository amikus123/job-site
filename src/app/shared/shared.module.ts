import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule, MaterialModule, RouterModule],
  declarations: [],
  exports: [FormsModule, ReactiveFormsModule, MaterialModule, RouterModule],
  providers: [],
})
export class SharedModule {}
