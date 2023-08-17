import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthrangeComponent } from './monthrange.component';

describe('MonthrangeComponent', () => {
  let component: MonthrangeComponent;
  let fixture: ComponentFixture<MonthrangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthrangeComponent]
    });
    fixture = TestBed.createComponent(MonthrangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
