import { AuthService } from './../../services/auth/auth.service';
import { Component } from '@angular/core';

interface Link {
  text: string;
  href: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  links: Link[] = [{ href: '/job-list', text: 'Jobs' }];
  employerLinks: Link[] = [
    { href: '/add-job', text: 'Add job' },
    { href: '/add-job', text: 'Your jobs' },
  ];
  employeeLinks: Link[] = [
    { href: '/job-applications', text: 'Your applications' },
  ];
  constructor(private auth: AuthService) {}
  isLoggedIn = this.auth.isLoggedIn;
  isEmployee = this.auth.isEmployee;
  isEmployer = this.auth.isEmployer;

  googleLogin() {
    this.auth.googleAuth(false);
  }
  signOut() {
    console.log('!!!');
    this.auth.signOut();
  }
}
