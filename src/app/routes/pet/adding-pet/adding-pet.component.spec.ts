import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingPetComponent } from './adding-pet.component';

describe('AddingPetComponent', () => {
  let component: AddingPetComponent;
  let fixture: ComponentFixture<AddingPetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddingPetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
