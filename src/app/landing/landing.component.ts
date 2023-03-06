import { FirestoreService } from './../services/firestore/firestore.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  constructor(public firestore: FirestoreService) {}
}
