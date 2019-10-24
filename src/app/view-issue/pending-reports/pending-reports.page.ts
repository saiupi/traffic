import { Component, OnInit } from '@angular/core';
import { DashboardViewIssueService } from 'src/app/api/dashboard-view-issue.service';
import { HttpserviceService } from 'src/app/api/httpservice.service';

@Component({
  selector: 'app-pending-reports',
  templateUrl: './pending-reports.page.html',
  styleUrls: ['./pending-reports.page.scss'],
})
export class PendingReportsPage implements OnInit {

  constructor(private pendingReports:DashboardViewIssueService,private http:HttpserviceService) { }
  issues:any;
  mobileNumber: any;
  ngOnInit() {
    this.mobileNumber = localStorage.getItem('token');
    return this.http.get('/userViewIssue/pendingReports' +"/"+this.mobileNumber).subscribe((res) => {
    //this.pendingReports.pending(this.mobileNumber).subscribe((res) => {
      this.issues = res;
      console.log("viewissue",this.issues);
    });
  }
}
