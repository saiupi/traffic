import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllReportsPage } from './get-all-reports.page';

describe('GetAllReportsPage', () => {
  let component: GetAllReportsPage;
  let fixture: ComponentFixture<GetAllReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAllReportsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAllReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
