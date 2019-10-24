import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicStorageModule } from '@ionic/storage';
import { PhotoProviderService } from './api/photo-provider.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { RegComponent } from './reg/reg.component';
import { ViewIssuePage } from './view-issue/view-issue.page';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { RegisterDirective } from './directives/register.directive';
// import { NumbersDirective } from './directives/numbers.directive';
import { File } from '@ionic-native/file/ngx';


@NgModule({
  declarations: [AppComponent,RegComponent,ViewIssuePage ],
  entryComponents: [ViewIssuePage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    
    
  ],
  providers: [
    LocationAccuracy,
    StatusBar,
    SplashScreen,
    Geolocation,
    Network,
    NativeGeocoder,
    Dialogs,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
Base64ToGallery,
Base64,
    PhotoProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
