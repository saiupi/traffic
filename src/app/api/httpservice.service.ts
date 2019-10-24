import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoaderproviderService } from './loaderprovider.service';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/do';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {
  //baseUrl: string = AppConfig.API_URL;
   // apiUrl : string="http://52.66.197.63:4000"
    apiUrl : string="http://192.168.3.211:4000"
  
  constructor(public http: HttpClient,private loader:LoaderproviderService,private loadingController:LoadingController) {}
  get(url) {
    //this.loader.presentLoading();


    let loading =   this.loadingController.create({
      spinner: 'crescent',
     // duration: 2000,
      message: 'Please wait...',
    });
    loading.then(loading => loading.present());


    // return this.http.get('http://192.168.2.57:4000/offence/getAll')
    return this.http.get(this.apiUrl+url)
      .finally(() => {
         loading.then(loading => loading.dismiss());

      });
  }

 


 post(url, body) {
  let loading =   this.loadingController.create({
    spinner: 'crescent',
   // duration: 2000,
    message: 'Please wait...',
  });
  loading.then(loading => loading.present());
    return this.http.post(this.apiUrl + url, body)
      .finally(() => {
        loading.then(loading => loading.dismiss());
      });
      
  }
 

  // put(url, body) {
  //   this.loader.show();
  //   return this.http.put(this.apiUrl + url, body)
  //     .finally(() => {
  //       this.loader.hide();
  //     });
  // }

  // delete(url) {
  //   this.loader.show();
  //   return this.http.delete(this.apiUrl + url)
  //     .finally(() => {
  //       this.loader.hide();
  //     });
  // }

  // patch(url, body) {
  //   this.loader.show();
  //   return this.http.patch(this.apiUrl + url, body)
  //     .finally(() => {
  //       this.loader.hide();
  //     });
  // }
}
