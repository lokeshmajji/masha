import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
   
  authenticated : boolean = false;
  userSubscription : Subscription;

  constructor(private authService : AuthService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(user =>{
      this.authenticated = !!user;
    });
    setInterval( this.timeRemaining.bind(this), 1000)
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

  toggleMenu: boolean = true
  handleMenuClick() {
    console.log(`toggleMenu`, this.toggleMenu)
    this.toggleMenu = !this.toggleMenu
  }

  expiry = 0
  timeRemaining() {
    if (localStorage.getItem("userData")) {
      const expirationDate = new Date(JSON.parse(localStorage.getItem("userData"))._tokenExpirationDate)
      const currentDate = new Date()
      // console.log('currentDate',expirationDate)
      // console.log('expirationDate',expirationDate)
      this.expiry = parseFloat(((expirationDate.getTime() - currentDate.getTime()) / 60000).toFixed(2))
    }
  }



}
