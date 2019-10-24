import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedReportsPage } from './rejected-reports.page';

describe('RejectedReportsPage', () => {
  let component: RejectedReportsPage;
  let fixture: ComponentFixture<RejectedReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedReportsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
