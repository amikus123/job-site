import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJobApplicationsComponent } from './view-job-applications.component';

describe('ViewJobApplicationsComponent', () => {
  let component: ViewJobApplicationsComponent;
  let fixture: ComponentFixture<ViewJobApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ViewJobApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewJobApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
