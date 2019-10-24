import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { DashboardViewIssueService } from '../api/dashboard-view-issue.service';
import { ToastController } from '@ionic/angular';
//import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpserviceService } from '../api/httpservice.service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import * as exif from 'exif-js';
import { NativeGeocoderOptions, NativeGeocoder } from '@ionic-native/native-geocoder/ngx';


@Component({
  selector: 'app-offline-post-issue',
  templateUrl: './offline-post-issue.page.html',
  styleUrls: ['./offline-post-issue.page.scss'],
})
export class OfflinePostIssuePage implements OnInit {
  dateTime: any;
  files: File;
  imagePreview: any;
  profileForm: FormGroup;
  offencetype: any;
  mobileNumber: any;
  submitted: boolean;
  onFileUpload(event) {
    this.files = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.files);

    // this.dateTime=this.files.lastModified
    this.dateTime = this.files.lastModified,
      // this.gps = this.gpss.Latitude


      console.log("resultsss", this.files)
  }

  constructor(private offlineIssueService: DashboardViewIssueService, private fb: FormBuilder,
    private http: HttpClient, private router: Router, public toastController: ToastController,
    private offenceTypeService: DashboardViewIssueService, private base64ToGallery: Base64ToGallery,
    private mediaService: DashboardViewIssueService, private sanitizer: DomSanitizer,
    private offlineIssueServices: HttpserviceService, private nativeGeocoder: NativeGeocoder) {
    this.profileForm = this.fb.group({
      offenceCategory: ['', [Validators.required, Validators.pattern("[a-zA-z ]*")]],
      location: ['', Validators.required],
      issueDate: ['', Validators.required],
      //issueTime: ['', Validators.required],
      //  files: ['', Validators.required],
    });
  }
  ngOnInit() {


    this.mobileNumber = localStorage.getItem('token');

 //   return this.offenceTypeService.offence().subscribe((res) => {
    return this.offlineIssueServices.get('/offence/getAll').subscribe((res) => {
      this.offencetype = res;
      console.log("offencetype", this.offencetype)
    });

  }
  OnUploadFile() {

    this.submitted = true;
    let profile = {
      offenceCategory: this.profileForm.controls['offenceCategory'].value,
      location: this.profileForm.controls['location'].value,
      issueDate: this.profileForm.controls['issueDate'].value,
      //issueTime: this.profileForm.controls['issueTime'].value,
      imagePreview: this.imagePreview,
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'
      })
    };
    const mobile = {
      mobileNum: this.mobileNumber
    };

    const OfflinePost = Object.assign(profile, mobile);

    return this.offlineIssueServices.post("/userReport/postIssue", profile).subscribe((res) => {
      //return this.offlineIssueService.postIssue(OfflinePost).subscribe((res) => {

      console.log("user", res);
      this.router.navigate(['/dashboard']);
      let toast = this.toastController.create({
        message: `offline Post successfully`,
        duration: 3000,
        position: 'bottom'
      });
      toast.then(toast => toast.present());

    });
  }
  HomeScreen() {
    this.router.navigate(['/home-screen']);
  }

  pservice: any
  downloadImage() {
    // this.base64ToGallery.base64ToGallery({ prefix: 'this.imagePreview', mediaScanner:true }).then(
    //   (res) => {
    this.mediaService.getImage(this.imagePreview).subscribe(
      (res) => {
        const fileURL = URL.createObjectURL(res);
        window.open(fileURL);
        //console.log("imagesss",fileURL)
        // const data = 'fileURL';
        // const blob = new Blob([data], { type: 'image/jpeg' });

        // this.pservice = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
        // console.log("dfjfj",this.pservice)
        let link = document.createElement('a');
        link.setAttribute('type', 'hidden');
        link.href = fileURL;
        link.download = fileURL;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
    );
  }
  // lo
  // changeListener($event) : void {
  //   this.readThis($event.target);
  // }

  // readThis(inputValue: any): void {
  //   var file:File = inputValue.files[0];
  //   var myReader:FileReader = new FileReader();

  //   myReader.onloadend = (e) => {
  //     this.imagePreview = myReader.result;
  //   }
  //   myReader.readAsDataURL(file);
  //   this.lo=file.type
  //   console.log("outpts",file)
  // }


  get f() { return this.profileForm.controls; }

  allMetaData: any;
  gpsLongitude: any;
  gpsLatitude: any
  loaded(e) {
    exif.getData(e.target, function () {
      console.log(e.target);
      this.allMetaData = exif.getAllTags(this);
      console.log("fdjafsdkf", this.allMetaData);
      console.log("Latitude", this.allMetaData.GPSLatitude[0].numerator);
      // console.log(this.allMetaData.GPSLatitude[1].numerator);
      // console.log(this.allMetaData.GPSLatitude[2].numerator);
      console.log("longitude", this.allMetaData.GPSLongitude[0].numerator);
      this.gpsLatitude = this.allMetaData.GPSLatitude[0].numerator + "." + this.allMetaData.GPSLatitude[1].numerator;
      this.gpsLongitude = this.allMetaData.GPSLongitude[0].numerator + "." + this.allMetaData.GPSLongitude[1].numerator;

      console.log("gpsLatitude", this.gpsLatitude);
      alert(this.gpsLatitude);
      alert(this.gpsLongitude);
      this.ReverseGeocoding(this.gpsLatitude, this.gpsLongitude)
    });


  }

  ReverseGeocodingResults: any;
  geocodingResults: any;

  ReverseGeocoding(gpsLatitude,gpsLongitude) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    }
    this.nativeGeocoder.reverseGeocode(gpsLatitude,gpsLongitude,options)
      .then((results) => {
        this.ReverseGeocodingResults = JSON.stringify(results[0]);
        this.geocodingResults = `${results[0].thoroughfare} in ${results[0].subLocality} ${results[0].locality}`
        console.log('locationsddd', this.ReverseGeocodingResults)
            alert(this.geocodingResults)
            alert(this.ReverseGeocodingResults)
      }, error => {
        console.log(error)
      });
  }

}