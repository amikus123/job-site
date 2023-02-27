import { NgModule } from '@angular/core';
import { FooterModule } from './footer/footer.module';
import { NavbarModule } from './navbar/navbar.module';

@NgModule({
  declarations: [],
  imports: [NavbarModule, FooterModule],
  exports: [NavbarModule, FooterModule],
})
export class LayoutModule {}
