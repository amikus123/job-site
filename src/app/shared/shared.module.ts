import { NavbarModule } from '../layout/navbar/navbar.module';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from '../layout/navbar/navbar.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  providers: [],
})
export class SharedModule {}
