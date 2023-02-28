import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login/login.component';
import { EmployerGuard } from './guards/employer.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { JobPageComponent } from './job/job-page/job-page.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { JobListPageComponent } from './job-list/job-list-page/job-list-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error/error-page/error-page.component';
import { RegisterComponent } from './login/register/register.component';
import { AccountPageComponent } from './account-page/account-page.component';

const routes: Routes = [
  {
    path: 'job-list',
    component: JobListPageComponent,
    title: 'Job Site - Job list',
  },
  {
    path: 'job/:id',
    component: JobPageComponent,
    title: 'Job Site - Job page',
  },

  {
    path: 'add-job',
    component: JobPageComponent,
    title: 'Job Site - Add Job',
    canActivate: [EmployerGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Job Site - Login',
    canActivate: [NotAuthGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Job Site - Register',
    canActivate: [NotAuthGuard],
  },
  {
    path: 'account',
    component: AccountPageComponent,
    title: 'Job Site - Account',
    canActivate: [AuthGuard],
  },
  {
    path: 'job-applications',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LandingPageComponent,
    title: 'Job Site - Find your dream job',
  },
  { path: '*', component: ErrorPageComponent, title: 'Job Site - Error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
