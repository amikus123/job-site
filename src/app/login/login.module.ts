import { LoginPageModule } from './login-page/login-page.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [LoginPageModule],
  exports: [LoginPageModule],
})
export class LoginModule {}
