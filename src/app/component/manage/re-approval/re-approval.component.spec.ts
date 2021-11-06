import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReApprovalComponent } from './re-approval.component';

describe('ReApprovalComponent', () => {
  let component: ReApprovalComponent;
  let fixture: ComponentFixture<ReApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
