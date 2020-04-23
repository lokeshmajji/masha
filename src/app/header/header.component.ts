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
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}
