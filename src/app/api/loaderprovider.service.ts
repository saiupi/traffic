import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderproviderService  {



  constructor(public http: HttpClient, public loadingController: LoadingController) {
    //this.loader = null;
  }
  // ngOnInit() {

  //   this.presentLoading()


  // }
   presentLoading() {
    let loading =   this.loadingController.create({
      spinner: 'crescent',
    // duration: 5000,
      message: 'Please wait...',
    });
    loading.then(loading => loading.present());
    
  }

  
  dismissLoading() {
    let loading =   this.loadingController.create({
      spinner: 'crescent',
      //duration: 5000,
      message: 'Please wait...',
    });
   
    loading.then(loading => loading.dismiss());
  }

  
}



