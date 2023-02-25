import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListPageComponent } from './job-list-page.component';

describe('JobListPageComponent', () => {
  let component: JobListPageComponent;
  let fixture: ComponentFixture<JobListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
