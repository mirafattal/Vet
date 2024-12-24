import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingStaffComponent } from './adding-staff.component';

describe('AddingStaffComponent', () => {
  let component: AddingStaffComponent;
  let fixture: ComponentFixture<AddingStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
