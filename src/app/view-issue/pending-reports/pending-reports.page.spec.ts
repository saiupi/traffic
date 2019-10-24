import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingReportsPage } from './pending-reports.page';

describe('PendingReportsPage', () => {
  let component: PendingReportsPage;
  let fixture: ComponentFixture<PendingReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingReportsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
