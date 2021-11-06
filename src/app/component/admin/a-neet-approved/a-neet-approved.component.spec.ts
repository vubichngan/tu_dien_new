import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ANeetApprovedComponent } from './a-neet-approved.component';

describe('ANeetApprovedComponent', () => {
  let component: ANeetApprovedComponent;
  let fixture: ComponentFixture<ANeetApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ANeetApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ANeetApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
