import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: any) {
    // return this.http.post("http://192.168.3.29:2222/userDetails/login",user)
    return this.http.post("http://192.168.2.57:4000/userDetails/login",user).catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.error.text || "Serever Error ")
  }
  // loginPost(profile:any){
  //       return this.http.post("http://192.168.2.55:1111/userReport/loginUser",profile)

  // }
  public loginDetailes:any;

  private messageSource = new BehaviorSubject(this.loginDetailes);
  currentMessage = this.messageSource.asObservable();


  changeMessage(message: string) {
    this.messageSource.next(message)
  }


  
}
