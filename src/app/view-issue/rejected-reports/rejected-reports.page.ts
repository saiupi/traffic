import { Component, OnInit } from '@angular/core';
import { DashboardViewIssueService } from 'src/app/api/dashboard-view-issue.service';
import { HttpserviceService } from 'src/app/api/httpservice.service';

@Component({
  selector: 'app-rejected-reports',
  templateUrl: './rejected-reports.page.html',
  styleUrls: ['./rejected-reports.page.scss'],
})
export class RejectedReportsPage implements OnInit {

  
  constructor(private rejectedReports:DashboardViewIssueService,private http:HttpserviceService) { }
  issues:any;
  mobileNumber: any;
  ngOnInit() {
    this.mobileNumber = localStorage.getItem('token');
    return this.http.get('/userViewIssue/rejectedReports'+"/"+this.mobileNumber).subscribe((res) => {
    //this.rejectedReports.rejected(this.mobileNumber).subscribe((res) => {
      this.issues = res;
      console.log("viewissue", this.issues);
    });
  }
}
