import { Component, OnInit } from '@angular/core';
import { DashboardViewIssueService } from 'src/app/api/dashboard-view-issue.service';
import { HttpserviceService } from 'src/app/api/httpservice.service';

@Component({
  selector: 'app-get-all-reports',
  templateUrl: './get-all-reports.page.html',
  styleUrls: ['./get-all-reports.page.scss'],
})
export class GetAllReportsPage implements OnInit {

  constructor(private getAllReports:DashboardViewIssueService,private http:HttpserviceService) { }
  issues:any;
  mobileNumber: any;
  ngOnInit() {
    this.mobileNumber = localStorage.getItem('token');
    return this.http.get('/userViewIssue/getAllReports'+"/"+this.mobileNumber).subscribe((res) => {
    // this.getAllReports.getAll(this.mobileNumber).subscribe((res) => {
      this.issues = res;
      console.log("viewissue", this.issues);
    });
  }

}
