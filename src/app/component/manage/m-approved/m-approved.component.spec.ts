import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MApprovedComponent } from './m-approved.component';

describe('MApprovedComponent', () => {
  let component: MApprovedComponent;
  let fixture: ComponentFixture<MApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
