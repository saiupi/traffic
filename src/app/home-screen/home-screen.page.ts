import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.page.html',
  styleUrls: ['./home-screen.page.scss'],
})
export class HomeScreenPage implements OnInit {
  url: string | ArrayBuffer;

  constructor(private router: Router) { }

  ngOnInit() {
  }
  signIn(){
    this.router.navigate(['/login']);
  }
  
  signUp(){
    this.router.navigate(['/register']);
  }
  
  skip(){
    this.router.navigate(['/home']);
    //this.ngOnInit();
  
  }
 
}
