import { Component, OnInit } from '@angular/core';
import { AuthService, ResponseData } from './auth.service';
import { FormGroup } from '@angular/forms';
import { error } from 'protractor';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector : 'app-auth',
    templateUrl : './auth.component.html'
})
export class AuthComponent implements OnInit{

    switchMode = false;
    errorMessage : string;
    loading : boolean = false;


    constructor(private authService: AuthService,private router : Router){

    }

    ngOnInit(){

    }
    onSwitchMode(){
        this.switchMode = !this.switchMode
    }

    onSubmit(authForm: FormGroup){
        this.loading = true;

        let authObservable : Observable<ResponseData>;
        if(!this.switchMode){
            authObservable = this.authService.signIn(authForm.value.email,authForm.value.password)
        } else{
            authObservable =  this.authService.signUp(authForm.value.email, authForm.value.password)
        }
        authObservable.subscribe(responseData => {
            this.loading = false;
            this.router.navigate(["/blog"])
        }, error => {
            this.loading = false;
            this.errorMessage = error
        })
        authForm.reset();
    }

  

}