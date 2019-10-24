import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostScenarioPage } from './post-scenario.page';

describe('PostScenarioPage', () => {
  let component: PostScenarioPage;
  let fixture: ComponentFixture<PostScenarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostScenarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostScenarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
