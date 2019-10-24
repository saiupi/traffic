import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MenuController, ToastController, LoadingController, AlertController } from '@ionic/angular';
import { LoginService } from '../api/login.service';
import { Login } from '../login';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { refreshDescendantViews } from '@angular/core/src/render3/instructions';
import { PhotoProviderService } from '../api/photo-provider.service';
import { HttpserviceService } from '../api/httpservice.service';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  registerForm: FormGroup;

  submitted = false;
  password: any;
  mobileNum: any;
  returnUrl: string;
  message: string;
  re: Object;
  firstNam: any;
  error: any;
  msg: Object;
  //authService: any;
  constructor(private authService: AuthService, private http: HttpClient,
    private router: Router, private fb: FormBuilder, private loginService: LoginService,
    public toastController: ToastController, private data: PhotoProviderService,
    public loadingController: LoadingController, private loginServices: HttpserviceService,
    private dialogs: Dialogs, public alertController: AlertController) {


  }

  ngOnInit() {




    this.registerForm = this.fb.group({
      mobileNum: ['', [Validators.required, Validators, Validators.pattern("^[0-9]*$")]],
      password: ['', Validators.required, Validators.minLength(6)],


    });
    this.returnUrl = '/dashboard';
    this.authService.logout();
  }
  onSubmit() {
    this.submitted = true;
    let profile = {
      password: this.registerForm.controls['password'].value,
      mobileNum: this.registerForm.controls['mobileNum'].value,

    }



    // this.loginService.login(profile).subscribe ((res) => {
    this.loginServices.post('/userDetails/login', profile).subscribe((res) => {

      this.firstNam = res

      console.log("fistname,mobileNum", this.firstNam.firstName, this.firstNam.mobileNum)
     


      if (profile) {

        console.log("Login successful");
        //this.authService.authLogin(profile);
        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('token', this.f.mobileNum.value);
        // localStorage.setItem('token', this.f.firstName.value);
        //this.router.navigate(['/dashboard']);
        let navigationExtras: NavigationExtras = {
          queryParams: {
            "firstName": this.firstNam.firstName,

          }
        };
        this.router.navigate([this.returnUrl], navigationExtras);
        //this.authService.login();
        let toast = this.toastController.create({
          message: `login successfully`,
          duration: 3000,
          position: 'bottom',

        });
        toast.then(toast => toast.present());

      }

    },
      (error: HttpErrorResponse) => {
        console.log("error responesx", error.error); // body

        this.errorMsg = error.error.text;

        this.alertController.create({
          message: '' + this.errorMsg  + ' Serever Error ',

        }).then(alert => {
          alert.present();
        });
      });

   this.loginService.loginDetailes = {
        frstName: this.firstNam.firstName
      }


  }

  errorMsg: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  get f() { return this.registerForm.controls; }






  async  presentLoading() {
    const loading = await this.loadingController.create({
      spinner: 'crescent',
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }
  // this.loginService.login(profile).subscribe((res)=> {
  //   this.firstNam=res,
  //   error=>this.errorMsg=error});
  //   this.router.navigate(['/dashboard']);

}
