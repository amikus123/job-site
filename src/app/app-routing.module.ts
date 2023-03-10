import { MyApplicationsComponent } from './my-applications/my-applications.component';
import { LandingComponent } from './landing/landing.component';
import { JobListComponent } from './job-list/job-list.component';
import { IsJobOwnerGuard } from './guards/is-job-owner.guard';
import { EditJobComponent } from './edit-job/edit-job.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { AddJobComponent } from './add-job/add-job.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login/login.component';
import { EmployerGuard } from './guards/employer.guard';
import { NotAuthGuard } from './guards/not-auth.guard';
import { JobPageComponent } from './job/job-page/job-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './login/register/register.component';
import { AccountPageComponent } from './account-page/account-page.component';

const routes: Routes = [
  {
    path: 'job-list',
    component: JobListComponent,
    title: 'Job Site - Job list',
  },

  {
    path: 'add-job',
    component: AddJobComponent,
    title: 'Job Site - Add Job',
    canActivate: [EmployerGuard],
  },
  {
    path: 'my-jobs',
    component: MyJobsComponent,
    title: 'Job Site - My Jobs',
    canActivate: [EmployerGuard],
  },

  // {
  //   path: 'view-job-applications/:jobId',
  //   component: JobPageComponent,
  //   title: 'Job Site - View Job Applications',
  //   canActivate: [IsJobOwnerGuard],
  // },

  {
    path: 'edit-job/:jobId',
    component: EditJobComponent,
    title: 'Job Site - Edit Job',
    canActivate: [IsJobOwnerGuard],
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
    component: MyApplicationsComponent,
  },
  {
    path: '',
    component: LandingComponent,
    title: 'Job Site - Find your dream job',
  },
  { path: '*', component: LandingComponent, title: 'Job Site - Error' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
