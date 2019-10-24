import { TestBed } from '@angular/core/testing';

import { DashboardViewIssueService } from './dashboard-view-issue.service';

describe('DashboardViewIssueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardViewIssueService = TestBed.get(DashboardViewIssueService);
    expect(service).toBeTruthy();
  });
});
