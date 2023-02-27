import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericLoginComponent } from './generic-form.component';

describe('GenericLoginComponent', () => {
  let component: GenericLoginComponent;
  let fixture: ComponentFixture<GenericLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericLoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GenericLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
