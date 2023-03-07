import { SharedModule } from 'src/app/shared/shared.module';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth.service';

interface Link {
  text: string;
  href: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  links: Link[] = [{ href: '/job-list', text: 'Jobs', icon: 'work' }];
  employerLinks: Link[] = [
    { href: '/add-job', text: 'Add job', icon: 'playlist_add' },
    { href: '/my-jobs', text: 'Your jobs', icon: 'list' },
  ];
  employeeLinks: Link[] = [
    { href: '/job-applications', text: 'Your applications', icon: 'list' },
  ];
  constructor(public auth: AuthService) {}
  isLoggedIn = this.auth.isLoggedIn;

  signOut() {
    console.log('!!!');
    this.auth.signOut();
  }
}
