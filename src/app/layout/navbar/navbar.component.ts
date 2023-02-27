import { AuthService } from './../../services/auth/auth.service';
import { Component } from '@angular/core';

interface Link {
  text: string;
  href: string;
  icon: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  links: Link[] = [{ href: '/job-list', text: 'Jobs', icon: 'work' }];
  employerLinks: Link[] = [
    { href: '/add-job', text: 'Add job', icon: 'playlist_add' },
    { href: '/add-job', text: 'Your jobs', icon: 'list' },
  ];
  employeeLinks: Link[] = [
    { href: '/job-applications', text: 'Your applications', icon: 'list' },
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
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number | undefined;
  color: string | undefined;
}
