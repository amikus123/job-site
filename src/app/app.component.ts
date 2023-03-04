import {
  GuardsCheckEnd,
  GuardsCheckStart,
  NavigationCancel,
  Router,
} from '@angular/router';
import { IsJobOwnerGuard } from './guards/is-job-owner.guard';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'job-site';
  constructor(private router: Router) {}
  loading = true;
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof GuardsCheckStart) {
        this.loading = true;
        console.log('GuardStart');
      }
      if (
        event instanceof GuardsCheckEnd ||
        event instanceof NavigationCancel
      ) {
        this.loading = false;
        console.log('GuardEnd');
      }
    });
  }
}
