import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { DashboardViewIssueService } from '../api/dashboard-view-issue.service';
import { ModalController, PopoverController, MenuController } from '@ionic/angular';
import { ViewIssuePage } from '../view-issue/view-issue.page';
import { LoginService } from '../api/login.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  // constructor(private router: Router) { }

  // ngOnInit() {
  // }
  profiles: any;
  firstName: any;
  message: any;
  async viewIssue(ev: any) {
    //this.router.navigate(['/view-issue']);
    //   const modal = await this.modalController.create({
    //     component: ViewIssuePage
    //   });
    //   return await modal.present();

    const popover = await this.popoverController.create({
      component: ViewIssuePage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }


  HomeScreen() {
    this.router.navigate(['/home-screen']);
  }
  PostScenario() {
    this.router.navigate(['/home']);

  }
  offlinePost() {
    this.router.navigate(['/offline-post-issue']);

  }

  mobileNumber: string;
  constructor(private router: Router, public authService: AuthService,
    private viewService: DashboardViewIssueService, private http: HttpClient,
    public modalController: ModalController, public popoverController: PopoverController,
    private menu: MenuController, private route: ActivatedRoute,private data :LoginService) {
    this.route.queryParams.subscribe(params => {
      this.firstName = params["firstName"];
      //this.lastname = params["lastname"];
    });

  }

  ngOnInit() {
    this.mobileNumber = localStorage.getItem('token');

    //  return this.http.get("http://192.168.2.55:2222/userReport/getAllReports").subscribe((res) => {
       this.data.currentMessage.subscribe(message => this.message = message);
       console.log("kdjfajfdfjkkdsa",this.message);
      // this.message = this.data.loginDetailes
      // console.log("kdjfajfdfjkkdsa",this.message);
  }
  ionViewDidEnter() {
    this.menu.enable(true);
  }

  ionViewWillLeave() {
    this.menu.enable(false);
  }

  logout(): void {
    console.log("Logout");
    this.authService.logout();
    this.router.navigate(['/home-screen']);

  }
  nofification() {
    this.router.navigate(['/notifications']);


  }
  reward() {
    this.router.navigate(['/reward-points']);


  }


}
