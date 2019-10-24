import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIssuePage } from './view-issue.page';

describe('ViewIssuePage', () => {
  let component: ViewIssuePage;
  let fixture: ComponentFixture<ViewIssuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIssuePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIssuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
