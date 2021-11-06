import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotApprovedYetComponent } from './not-approved-yet.component';

describe('NotApprovedYetComponent', () => {
  let component: NotApprovedYetComponent;
  let fixture: ComponentFixture<NotApprovedYetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotApprovedYetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotApprovedYetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
