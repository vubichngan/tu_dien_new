import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AApprovedComponent } from './a-approved.component';

describe('AApprovedComponent', () => {
  let component: AApprovedComponent;
  let fixture: ComponentFixture<AApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
