import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardViewIssueService } from '../api/dashboard-view-issue.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ViewController } from '@ionic/core';

@Component({
  selector: 'app-view-issue',
  templateUrl: './view-issue.page.html',
  styleUrls: ['./view-issue.page.scss'],
})
export class ViewIssuePage implements OnInit {
  constructor(private http: HttpClient, private viewService: DashboardViewIssueService, 
    private modalCtrl: ModalController, private router: Router,private popoverController :PopoverController) { }
  profiles: any;
  mobileNumber: any;
  ngOnInit() {
    // this.mobileNumber = localStorage.getItem('token');
    // //return this.http.get(http://192.168.2.55:1111/userReport/getAllReports +"/"+this.mobileNumber).subscribe((res) => {
    // this.viewService.viewIssue(this.mobileNumber).subscribe((res) => {
    //   this.profiles = res;
    //   console.log("viewissue", this.profiles);
    // });
  }
  closeModal()
  {
    this.modalCtrl.dismiss();
  }
  getAllReports(){
    this.router.navigate(['/get-all-reports']);
    this.popoverController.dismiss();
   
  }
  pendingReports(){
    this.router.navigate(['/pending-reports']);
    this.popoverController.dismiss();
  }
  rejectedReports(){
    this.router.navigate(['/rejected-reports']);
    this.popoverController.dismiss();
  }
  approvedReports(){
    this.router.navigate(['/approved-reports']);
    this.popoverController.dismiss();
  }
}



