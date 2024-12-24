import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingMedicalComponent } from './adding-medical.component';

describe('AddingMedicalComponent', () => {
  let component: AddingMedicalComponent;
  let fixture: ComponentFixture<AddingMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingMedicalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
