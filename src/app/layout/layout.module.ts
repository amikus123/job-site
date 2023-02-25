import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule } from './footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  declarations: [],
  imports: [NavbarModule, FooterModule, CommonModule],
  exports: [NavbarModule, FooterModule],
})
export class LayoutModule {}
