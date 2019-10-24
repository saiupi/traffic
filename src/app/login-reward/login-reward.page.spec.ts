import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRewardPage } from './login-reward.page';

describe('LoginRewardPage', () => {
  let component: LoginRewardPage;
  let fixture: ComponentFixture<LoginRewardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRewardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRewardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
