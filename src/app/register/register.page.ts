import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { RegisterService } from '../api/register.service';
import 'rxjs/add/operator/map';
import { PhotoProviderService } from '../api/photo-provider.service';
import Swal from 'sweetalert2'
import { DashboardViewIssueService } from '../api/dashboard-view-issue.service';
import { ToastController, AlertController } from '@ionic/angular';
import { DataService } from '../api/data.service';
import { HttpserviceService } from '../api/httpservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  registerForm: FormGroup;

  name: string;
  firstName: any;
  lastName: any;
  dob: any;
  gender: any;
  mobileNum: any = "";

  email: any;
  password: any;
  mobile: any;
  submitted = false;
  profile: any;
  status: any;
  firstNam: any;
  imagePreview: any
  profiles: any
  pro: any;
  errorMsg: any;
  constructor(private data: PhotoProviderService, private registerService: RegisterService, private http: HttpClient,
    private router: Router, private formBuilder: FormBuilder, private postIssueService: DashboardViewIssueService,
    public toastController: ToastController, public activatedRoute: ActivatedRoute, private datas: DataService,
    private https: HttpserviceService, public alertController: AlertController) {
    this.activatedRoute.queryParams.subscribe((res) => {
      // console.log(res);
      this.profile = res;
      // this.profile=res
      console.log("isssuesprofiles", this.profile)


    });


  }

  ngOnInit() {

    this.pro = this.datas.image;
    console.log("imagedatesssssprofile", this.pro);
    // this.profile = Object.assign(this.pro,this.profiles);
    // console.log("isssuesddddd",this.profile)
    // // this.profile = this.data.storage
    //console.log("resultsss", this.profile);


    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNum: ['', Validators.required, Validators.minLength(10), Validators.maxLength(10)],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      email: ['', Validators.required],
      // userName: ['', Validators.required],
      password: ['', Validators.required],
      // status:['', Validators.required],



    });

  }
  public error: any;

  onSubmit() {
    this.submitted = true;
    const profiles = {

      firstName: this.registerForm.controls['firstName'].value,
      lastName: this.registerForm.controls['lastName'].value,
      mobileNum: this.registerForm.controls['mobileNum'].value,
      dob: this.registerForm.controls['dob'].value,
      gender: this.registerForm.controls['gender'].value,
      email: this.registerForm.controls['email'].value,
      password: this.registerForm.controls['password'].value,
      // status: this.registerForm.controls['status'].value,

      // userName: this.registerForm.controls['userName'].value,
      //  headers: new HttpHeaders({
      //     'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'
      //   })  
    }
    const mobile = {
      mobileNum: profiles.mobileNum
    }
    //   const profilee={
    //     prof:this.profile.res
    // }

    this.mobileNum = profiles.mobileNum
    //  console.log('mobienumber',mobile);
    // return this.http.post("http://192.168.2.55:2222/userDetails/regUserDetail",profiles).subscribe((res) => {
    localStorage.setItem('token', this.f.mobileNum.value);

    // this.registerService.register(profiles).subscribe((res) => {
    return this.https.post("/userDetails/regUserDetail", profiles).subscribe((res) => {
      this.firstNam = res
      console.log("firstnamefdafdsdfa", this.firstNam.firstName)
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "firstName": this.firstNam.firstName,

        }
      };
      this.router.navigate(['/dashboard'], navigationExtras);
      let toast = this.toastController.create({
        message: `register successfully`,
        duration: 3000,
        position: 'bottom'
      });
      toast.then(toast => toast.present());

      if (this.profile, this.pro) {

        console.log("register successful");


        //return this.postIssueService.postIssue(this.profile,this.mobileNum).subscribe((res) => {
        //  const registerPost = Object.assign(mobile,this.profile.res);
        const registerPost = Object.assign(mobile, this.profile, this.pro);

        console.log("finalregisterPost", registerPost)
        return this.https.post("/userReport/postIssue", registerPost).subscribe((res) => {
          // return this.postIssueService.postIssue(registerPost).subscribe((res) => {
          let headers = new HttpHeaders();
          headers = headers.set('Content-Type', 'application/json; charset=utf-8');

          Swal.fire('congrats...', 'Issue has been posted successfully', 'success'),
            console.warn("beforeregister", res);
          this.router.navigate(['/dashboard']);

          // this.router.navigate(['/dashboard'],navigationExtras);
          error => { // second parameter is to listen for error

            //this.error = error;
            console.log("errormessage", error);
          }

          //   //this.authService.login();
        });


      }

    },
      (error: HttpErrorResponse) => {
        console.log("error responesx", error.error); // body


        this.errorMsg = error.error;
        console.log("404error", this.errorMsg);
        this.alertController.create({
          message: '' + this.errorMsg + '',

        }).then(alert => {
          alert.present();
        });
      });


  }
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  // gotoDash(){
  //   this.router.navigate(['/dashboard']);
  // }

  get f() { return this.registerForm.controls; }

}
