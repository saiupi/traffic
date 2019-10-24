import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient) { }
  register(profiles :any){
    // return this.http.post("http://192.168.3.29:2222/userDetails/regUserDetail", profiles)
    return this.http.post("http://192.168.2.57:4000/userDetails/regUserDetail", profiles)
    //return this.http.post("http://52.66.197.63:4000/userDetails/regUserDetail",profiles)


  }
}
