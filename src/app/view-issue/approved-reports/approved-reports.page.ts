import { Component, OnInit } from '@angular/core';
import { DashboardViewIssueService } from 'src/app/api/dashboard-view-issue.service';
import { HttpserviceService } from 'src/app/api/httpservice.service';

@Component({
  selector: 'app-approved-reports',
  templateUrl: './approved-reports.page.html',
  styleUrls: ['./approved-reports.page.scss'],
})
export class ApprovedReportsPage implements OnInit {

  constructor(private approvedReports:DashboardViewIssueService,private http:HttpserviceService) { }
  issues:any;
  mobileNumber: any;
  ngOnInit() {
    this.mobileNumber = localStorage.getItem('token');
     //return this.http.get('/userViewIssue/approvedReports'+"/"+this.mobileNumber).subscribe((res) => {
      return this.http.get('/userViewIssue/approvedReports' +"/"+this.mobileNumber).subscribe((res) => {
  // this.approvedReports.approved(this.mobileNumber).subscribe((res) => {
      this.issues = res;
      console.log("viewissue", this.issues);
    });
  }

}
