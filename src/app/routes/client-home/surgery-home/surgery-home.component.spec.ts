import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurgeryHomeComponent } from './surgery-home.component';

describe('SurgeryHomeComponent', () => {
  let component: SurgeryHomeComponent;
  let fixture: ComponentFixture<SurgeryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurgeryHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurgeryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
