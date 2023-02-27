import { LoginPageModule } from './login-page/login-page.module';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [LoginPageModule],
  exports: [LoginPageModule],
})
export class LoginModule {}
