import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { PhotoProviderService } from '../api/photo-provider.service';
import { DashboardViewIssueService } from '../api/dashboard-view-issue.service';
import { DataService } from '../api/data.service';
import { HttpserviceService } from '../api/httpservice.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-post-scenario',
  templateUrl: './post-scenario.page.html',
  styleUrls: ['./post-scenario.page.scss'],
})

export class PostScenarioPage implements OnInit {
  profileForm: FormGroup;
  files: any;
 // profileForm: FormGroup;
  imagePreview: any;
  base64Image: any
  //data: any;
  offencetype:any;
  latitude: any;
  locality: any;
  mobileNum: any;
  locationTime:any;
  ReverseGeocodingResults: any;
  geocodingResults: any;
  imagePre: any;
  errorMsg: any;
  longitude: number;
  
  constructor(private data: PhotoProviderService, private fb: FormBuilder,
    private router: Router,private offenceTypeService:DashboardViewIssueService,
    private http: HttpClient, private route: ActivatedRoute,
    public toastController: ToastController,private datas:DataService
    ,private offenceTypeServices:HttpserviceService, public alertController: AlertController,
    private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
    this.profileForm = this.fb.group({
      offenceCategory: ['', [Validators.required, Validators.pattern("[a-zA-z ]*")]],
      location: ['', Validators.required],
      issueDate: ['', Validators.required],
    });
    
    this.route.queryParams.subscribe(params => {
     
      this.ReverseGeocodingResults = params["ReverseGeocodingResults"];
      this.locationTime = params["locationTime"];
       this.locations = this.ReverseGeocodingResults
     // this.imagePreview = params["imagePreview"];
      this.geocodingResults = params["geocodingResults"];

    });

   


      this.geolocation.getCurrentPosition().then((resp) => {

        // console.log("latitude", resp.coords.latitude);
        // console.log("longitude", resp.coords.longitude);
        //  this.ReverseGeocoding(latitude,longitude)
        //let latitude = resp.coords.latitude
      })
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        // data can be a set of coordinates, or an error (if an error occurred).
        this.latitude = data.coords.latitude;
        this.longitude = data.coords.longitude;
        this.locationTime = data.timestamp;
        //this.locationaccuracy = data.coords.accuracy;
        this.ReverseGeocoding(this.latitude, this.longitude)
      })



  }

  offenceCategory: any;
  locations: any;
  issueDate: any;
  issueTime: any;
  profile: any;
  location;
  submitted = false;
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileForm.invalid) {
        return;
    }
    //this.router.navigate(['/dashboard']);
    this.submitted = true;
    this.offenceCategory = this.profileForm.controls['offenceCategory'].value,
      this.location = this.profileForm.controls['location'].value,
      this.issueDate = this.profileForm.controls['issueDate'].value,
      this.imagePreview = this.imagePreview
    

    this.data.storage = {
      offenceCategory: this.offenceCategory,
      location: this.location,
      issueDate: this.locationTime,
      //: this.issueTime,
      imagePreview: this.imagePreview,

    }

    const continuePost = Object.assign(this.data.storage,this.imagePreview);
    console.log("datasorojg",continuePost)
    this.profile = this.data.storage;
    // console.log("postsenario",this.profile)
    this.router.navigate(['/login-reward']);

  }

//  login(user: any) {
//     // return this.http.post("http://192.168.3.29:2222/userDetails/login",user)
//     return this.http.post("http://192.168.2.57:4000/userDetails/login", user).catch(this.errorHandler);
//   }
//   errorHandler(error: HttpErrorResponse) {
//     return Observable.throw(error.error.text || "Serever Error ")
//   }


  get f() { return this.profileForm.controls; }

  ngOnInit() {

    this.imagePreview = this.datas.image;
    console.log("imagedate",this.imagePreview)
   
   //return this.offenceTypeService.offence().subscribe((res) => {
    return this.offenceTypeServices.get('/offence/getAll').subscribe((res) => {
      this.offencetype = res;
      console.log("offencetype", this.offencetype)

 
    },
    (error: HttpErrorResponse) => {
      console.log("error responesx", error.error); // body

     // this.errorMsg = error.error.text;
      this.errorMsg = error.error.error;

      this.alertController.create({
        message: '' + this.errorMsg || "Serever Error " + '',

      }).then(alert => {
        alert.present();
      });
    });

    
//});

  }
  // public selectedMoment = new Date();
  myDate: String = new Date().toLocaleDateString();
  //myTime: String = new Date().toLocaleTimeString();

  //stringDateModel: string = new Date().toString().split('T')[0];

 

lg(){
  this.router.navigate(['/login-reward']);
}

// ReverseGeocodingResults: any;
//   geocodingResults: any;

  ReverseGeocoding(latitude, longitude) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    }
    this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
      .then((results) => {
        this.ReverseGeocodingResults = JSON.stringify(results[0]);
        this.geLocations = `${results[0].thoroughfare} in ${results[0].subLocality} ${results[0].locality} ${results[0].postalCode}`
        console.log('locations', this.ReverseGeocodingResults)
        console.log('praticular loctions', this.geLocations)
      }, error => {
        console.log(error)
      });
  }

  geLocations:any;
}
