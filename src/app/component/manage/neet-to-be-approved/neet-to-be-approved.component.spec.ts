import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeetToBeApprovedComponent } from './neet-to-be-approved.component';

describe('NeetToBeApprovedComponent', () => {
  let component: NeetToBeApprovedComponent;
  let fixture: ComponentFixture<NeetToBeApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeetToBeApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NeetToBeApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
