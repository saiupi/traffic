import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflinePostIssuePage } from './offline-post-issue.page';

describe('OfflinePostIssuePage', () => {
  let component: OfflinePostIssuePage;
  let fixture: ComponentFixture<OfflinePostIssuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflinePostIssuePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflinePostIssuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
