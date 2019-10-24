import { Component, OnInit, Input, AfterViewInit, ViewChild } from '@angular/core';

import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { DashboardViewIssueService } from '../api/dashboard-view-issue.service';
import Swal from 'sweetalert2'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostScenarioPage } from '../post-scenario/post-scenario.page';
import { PhotoProviderService } from '../api/photo-provider.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../api/login.service';
import { AuthService } from '../auth.service';
import 'rxjs/add/operator/concat'
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { DataService } from '../api/data.service';
import { HttpserviceService } from '../api/httpservice.service';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-login-reward',
  templateUrl: './login-reward.page.html',
  styleUrls: ['./login-reward.page.scss'],
})
export class LoginRewardPage implements OnInit {
  profiles: any;
  // location: any;
  // issueDate:any;
  // issueTime:any;
  // imagePreview:any;
  //offenceCategory:any;
  registerForm: FormGroup;
  message: any;
  returnUrl: string;
  mobileNum: any;
  firstNam:any;
  submitted = false;
  constructor(private authService: AuthService, private http: HttpClient, private router: Router, private route: ActivatedRoute,
    private postIssueService: DashboardViewIssueService, private data: PhotoProviderService,
    private fb: FormBuilder, private loginService: LoginService,private im:DataService,
    private postIssueServices:HttpserviceService,private toastController: ToastController) {

    // this.route.queryParams.subscribe(params => {
    //   if (params && params.special) {
    //     this.issueTime= (params.special);

    //     //     this.issueTime = (params.special);
    //     //   this.issueDate = (params.special);
    //     //this.ReverseGeocodingResults=(params.special);
    //     console.log("results", this.location)
    //   }
    // });

  }
  

  ngOnInit() {
    //console.log(JSON.stringify(this.data.storage));
    this.profiles = this.data.storage
    
    console.log("results", this.profiles)
   
    this.registerForm = this.fb.group({
      mobileNum: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(6)],


    });
    this.returnUrl = '/dashboard';
    this.authService.logout();

  }
 

  onSubmit() {
    // this.submitted = true;
    // let profile = {
    //   mobileNum: this.registerForm.controls['mobilenum'].value,
    //   password: this.registerForm.controls['password'].value,

    // }
    // //const traffic = profile.concat( this.profiles);
    // //const traffic = Object.assign(profile, this.profiles);
    // this.loginService.login(profile).subscribe((res) => {
    //   console.warn("user", res);
    //   this.router.navigate(['/dashboard'])

    this.submitted = true;
    let profile = {
      password: this.registerForm.controls['password'].value,
      mobileNum: this.registerForm.controls['mobileNum'].value,


    }
    const mobile = {
      mobileNum: profile.mobileNum
    };



    return this.postIssueServices.post("/userDetails/login",profile).subscribe(res => {
      //this.loginService.login(profile).subscribe((res) => {
        this.firstNam=res
        console.log("firstname",this.firstNam.firstName)
        let navigationExtras: NavigationExtras = {
          queryParams: {
              "firstName": this.firstNam.firstName,
              
          }
        };
        let toast = this.toastController.create({
          message: `login successfully`,
          duration: 3000,
          position: 'bottom'
        });
        toast.then(toast => toast.present());
      // this.router.navigate(['/dashboard'])

      if (profile) {

        console.log("Login successful");
        //this.authService.authLogin(profile);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.f.mobileNum.value);
        const loginPost = Object.assign(this.profiles,mobile);
        //this.router.navigate(['/dashboard']);
        
        return this.postIssueServices.post("/userReport/postIssue",loginPost).subscribe((res) => {
       // return this.postIssueService.postIssue(loginPost).subscribe((res) => {
          Swal.fire('congrats...', 'Issue has been posted successfully', 'success'),
            console.warn("user", res);
          this.router.navigate([this.returnUrl],navigationExtras);
          //   //this.authService.login();
        });
      }

      //   else {
      //     this.message = "Please check your userid and password";
      //     //   let toast = this.toastController.create({
      //     //   message: `Please check your userName and password`,
      //     //   duration: 3000,
      //     //     position: 'bottom'
      //     // });
      //     //     toast.then(toast => toast.present());
      //     //     }
      //   }
    });
  }
  
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  get f() { return this.registerForm.controls; }

  continue() {

    //this.router.navigate(['/reg',67,'project','imag']);
    // Swal.fire('congrats...', 'Issue has been posted successfully', 'success'),
    //     this.router.navigate(['/dashboard']);
    //return this.http.post("http://192.168.2.55:1111/userReport/continueAnyway",this.profiles).subscribe((res) => {
//---------------------------------------------------------------------------------------------
    let mobileNotRegister = {
      mobileNum: "Not Registered",

    }
    const continuePost = Object.assign(this.profiles,mobileNotRegister);

    return this.postIssueServices.post("/userReport/postIssue",continuePost).subscribe((res) => {

   // return this.postIssueService.postIssue(continuePost).subscribe((res) => {
      Swal.fire('congrats...', 'Issue has been posted successfully', 'success'),
        this.router.navigate(['/home-screen']);
      console.warn("user", res);


    });
 //this.router.navigate(['/dashboard']);
   }
  register() {
    // this.router.navigate(['/register'],{
    //   queryParams: this.profiles,
    //   });
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.router.navigate(['/register'],{ queryParams: 
      {
        //imagePreview:this.profiles.imagePreview,
        issueDate:this.profiles.issueDate,
        location:this.profiles.location,
        offenceCategory: this.profiles.offenceCategory} });
 

    //this.router.navigate(['/register']);
 }


 dashboard(){
     this.router.navigate(['/dashboard'])
 }
 
}
