import { SharedModule } from './../../shared/shared.module';
import { LoginPageComponent } from './login-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoginPageComponent],
})
export class LoginPageModule {}
