import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, SharedModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
