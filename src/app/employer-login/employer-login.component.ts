import { SharedModule } from 'src/app/shared/shared.module';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employer-login',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './employer-login.component.html',
  styleUrls: ['./employer-login.component.scss'],
})
export class EmployerLoginComponent {}
