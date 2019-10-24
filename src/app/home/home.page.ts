import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Camera, CameraOptions, } from '@ionic-native/camera/ngx';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NativeGeocoder, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform, AlertController, ToastController } from '@ionic/angular';
import { PhotoProviderService } from '../api/photo-provider.service';
// import { DomSanitizer } from '@angular/platform-browser';
import { DashboardViewIssueService } from '../api/dashboard-view-issue.service';
import { AuthService } from '../auth.service';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { DataService } from '../api/data.service';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';

import { ConnectionService } from 'ng-connection-service';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  profileForm: FormGroup;
  imagePreview: any;
  base64Image: any;
  latitude: any;
  longitude: any;
  locationTime: any;
  locationaccuracy: any;
  files: any;
  imagePreviews: any;
  imagepre: string;
  datetime: any;

  // base64: any;
  constructor(private datas: PhotoProviderService, private geolocation: Geolocation, private fb: FormBuilder,
    private router: Router, private http: HttpClient, private camera: Camera, private mediaService: DashboardViewIssueService,
    private nativeGeocoder: NativeGeocoder, private platform: Platform, private authService: AuthService,
    private base64: Base64, private locationAccuracy: LocationAccuracy,
    private datass: DataService,
    private route: ActivatedRoute, private network: Network, private dialogs: Dialogs,
    public alertController: AlertController, public toastController: ToastController, private connectionService: ConnectionService) {

    this.profileForm = this.fb.group({
      offenceCategory: ['', [Validators.required, Validators.pattern("[a-zA-z ]*")]],
      location: ['', Validators.required],
      issueDate: ['', Validators.required],
      issueTime: ['', Validators.required],
      files: ['', Validators.required],
    });
    this.platform.ready().then(() => {
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
        this.locationaccuracy = data.coords.accuracy;
        this.ReverseGeocoding(this.latitude, this.longitude)
      })
    })
    // this.platform.ready().then(() => {
    //   this.network.onDisconnect().subscribe(() => {
    //    console.log('network was disconnected :-(');
    //    alert("FirstPage onDisconnect");
    //   });
    //   this.network.onConnect().subscribe(() => {
    //    console.log('network was connected :-)');
    //    alert("FirstPage onConnect");
    //   });
    //  });

  

  }

  online: boolean;
  isNetworkStopped = false;

  OnUploadFile() {
    let profile = {
      offenceCategory: this.profileForm.controls['offenceCategory'].value,
      location: this.profileForm.controls['location'].value,
      issueDate: this.profileForm.controls['issueDate'].value,
      issueTime: this.profileForm.controls['issueTime'].value,
      imagePreview: this.imagePreview,
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data; boundary=----WebKitFormBoundaryuL67FWkv1CA'
      })
    };
    return this.http.post("http://192.168.2.55:1111/userReport/postIssue", profile).subscribe((res) => {
      console.log("user", res);
    });
  }



  ngOnInit() {
   
    this.route.params.subscribe(val => {
      if (val) {
        this.takePictures()
      }
      else {
        this.takePictures()
      }

    });

    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if (canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => console.log('Request successful'),
          error => console.log('Error requesting location permissions', error)
        );
      }

    });
 
    //this.connectionService.monitor();
  }

  takePictures = () => {

    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: true,
      // targetWidth: 400,
      // targetHeight: 400,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):

      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });






  }
  
 // status = 'ONLINE';
  isConnected = true;

  // let toast = this.toastController.create({
  //   message: `login successfully`,
  //   duration: 3000,
  //   position: 'bottom'
  // });
  // toast.then(toast => toast.present());


  //   clickImage(){

  //       this.mediaService.getImage(this.imagePreview).subscribe(
  //         (res) => {
  //           const fileURL = URL.createObjectURL(res);
  //           window.open(fileURL);
  //           //console.log("imagesss",fileURL)
  //           // const data = 'fileURL';
  //           // const blob = new Blob([data], { type: 'image/jpeg' });

  //           // this.pservice = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  //           // console.log("dfjfj",this.pservice)
  //           let link = document.createElement('a');
  //           link.setAttribute('type', 'hidden');
  //           link.href = fileURL;
  //           link.download = fileURL;
  //           document.body.appendChild(link);
  //           link.click();
  //           link.remove();
  //         }
  //       );

  // }


  HomeScreen() {

    // console.log("Logout");
    // this.authService.logout();
    // this.router.navigate(['/home-screen']);
    this.online = window.navigator.onLine;

    fromEvent(window, 'online').subscribe(e => {
      this.online = true;
     

    });

    fromEvent(window, 'offline').subscribe(e => {
      this.online = false;
    });

    if(!this.online){
      this.router.navigate(['/home']);
      let toast = this.toastController.create({
        message: `Please switch on your data or WiFi and try again`,
        duration: 500,
        position: 'bottom'
      });
      toast.then(toast => toast.present());
    }
    else{
     // this.router.navigate(['/post-scenario']);
     console.log("Logout");
           this.authService.logout();
        this.router.navigate(['/home-screen']);

    }
  



  }

  PostScenario() {
    
    let navigationExtras: NavigationExtras = {
      queryParams: {
       
        ReverseGeocodingResults: this.ReverseGeocodingResults,
        geocodingResults: this.geocodingResults,
        locationTime: this.locationTime,
        //imagePreview:this.base64Image,
        //image: this.imagePreview

      }
    };
    // this.connectionService.monitor().subscribe(isConnected => {
    //   this.isConnected = isConnected;
    //   // if (this.isConnected) {
    //   //   this.status = "ONLINE";
    //   // }
    //   // else {y
    
    //   //   this.status = "OFFLINE";
    //   // }
    //   // alert(this.status);
    // })
    // if (this.isConnected) {
    //   this.router.navigate(['/post-scenario'],navigationExtras);
    // }
    // else {
    //   this.router.navigate(['/home']);
    //   let toast = this.toastController.create({
    //     message: `Net Disconneted`,
    //     duration: 500,
    //     position: 'bottom'
    //   });
    //   toast.then(toast => toast.present());
    // }
    this.online = window.navigator.onLine;

    fromEvent(window, 'online').subscribe(e => {
      this.online = true;
     

    });

    fromEvent(window, 'offline').subscribe(e => {
      this.online = false;
    });
    if(!this.online){
      this.router.navigate(['/home']);
      let toast = this.toastController.create({
        message: `Please switch on your data or WiFi and try again`,
        duration: 500,
        position: 'bottom'
      });
      toast.then(toast => toast.present());
    }
    else{
      this.router.navigate(['/post-scenario'],navigationExtras);
        

    }
  






    // this.messageToEmit.emit(this.locationTime)
    // console.log("timedateadnasai",this.locationTime)
    this.datass.image = {

      //: this.issueTime,
      imagePreview: this.base64Image

    }
  }



  myDate: String = new Date().toISOString();
  ReverseGeocodingResults: any;
  geocodingResults: any;

  ReverseGeocoding(latitude, longitude) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    }
    this.nativeGeocoder.reverseGeocode(latitude, longitude, options)
      .then((results) => {
        this.ReverseGeocodingResults = JSON.stringify(results[0]);
        this.geocodingResults = `${results[0].thoroughfare} in ${results[0].subLocality} ${results[0].locality}`
        console.log('locations', this.ReverseGeocodingResults)
        console.log('praticular loctions', this.geocodingResults)
      }, error => {
        console.log(error)
      });
  }


  

}





