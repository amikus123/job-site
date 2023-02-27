import { EmployerGuard } from './guards/employer.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { EmployerLoginComponent } from './employer-login/employer-login.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { JobPageComponent } from './job/job-page/job-page.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { JobListPageComponent } from './job-list/job-list-page/job-list-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error/error-page/error-page.component';

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
    path: 'employee-login',
    component: EmployeeLoginComponent,
    title: 'Job Site - Employee Login',
    canActivate: [NotAuthGuard],
  },
  {
    path: 'employer-login',
    component: EmployerLoginComponent,
    title: 'Job Site - Employer Login',
    canActivate: [NotAuthGuard],
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
