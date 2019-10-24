import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public image: any;
  public rImage: any;

  firstname:any

  // private messageSource = new BehaviorSubject('sai');
  // currentMessage = this.messageSource.asObservable();
  user= new BehaviorSubject('Ojas');
  constructor() { }



  
}
