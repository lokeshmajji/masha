import { Injectable, OnInit } from '@angular/core';
import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, take, exhaustMap  } from 'rxjs/operators'
import { throwError, Subject, BehaviorSubject} from 'rxjs'
import { User } from './user.model';
import { Router } from '@angular/router';

export interface ResponseData{
    idToken : string;
    email : string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered? : boolean;
}

@Injectable({
    providedIn : 'root'
})
export class AuthService implements OnInit{

    //user = new Subject<User>();
    user = new BehaviorSubject<User>(null);
    logoutInterval : any;
    autoRenewInterval: any;
    expirationDate: Date;

    signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDi8b7mjzP1mpNx_e87ZxItpoH7zF6yvcY'
    signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDi8b7mjzP1mpNx_e87ZxItpoH7zF6yvcY'
    refreshTokenUrl = 'https://securetoken.googleapis.com/v1/token?key=AIzaSyDi8b7mjzP1mpNx_e87ZxItpoH7zF6yvcY'
    constructor(private http: HttpClient,private router: Router){

    }

    ngOnInit(){

    }

    signUp(email: string,password:string){
        return this.http.post<ResponseData>(this.signUpUrl,{
            email: email, 
            password: password,
            returnSecureToken: true})
            .pipe( 
                catchError( error => {
                    return throwError(this.handleError(error))
                }),
                tap(res => this.handleAuthentication(res))
            );
    }

    signIn(email:string, password: string){
        return this.http.post<ResponseData>(this.signInUrl,{
            email: email, 
            password: password,
            returnSecureToken: true
        }).pipe( 
            catchError( error => {
                return throwError(this.handleError(error))
            }),
            tap(res => this.handleAuthenticationSignIn(res))
        );
    }

    handleAuthentication(res : ResponseData){
        const expirationDate = new Date(new Date().getTime() + +res.expiresIn*1000);
        const user = new User(res.email,res.localId, res.idToken, expirationDate, res.refreshToken);
        this.user.next(user);
        this.autoLogout(+res.expiresIn * 1000); //convert to ms for setinterval
        localStorage.setItem('userData', JSON.stringify(user));
    }

    getExpiry(expiresIn) {
        //TODO DEV Purposes only
        // return 180 * 1000;
        return +expiresIn*1000 //convert to ms for setinterval 
    }
    handleAuthenticationSignIn(res: ResponseData) {
        console.log("In handleAuthenticationSignIn()")
        const expiryTime = this.getExpiry(res.expiresIn) 
        const expirationDate = new Date(new Date().getTime() + expiryTime);
        const user = new User(res.email,res.localId, res.idToken, expirationDate, res.refreshToken);
        this.user.next(user);
        this.autoRenew(expiryTime); //convert to ms for setinterval 
        localStorage.setItem('userData', JSON.stringify(user));
        this.expirationDate = expirationDate
    }
    handleAuthenticationAutoRefresh(res: any) {
        console.log("In handleAuthenticationAutoRefresh()")
        console.log(`res.expires_in`, +res.expires_in)
        console.log("Clearing the interval ")
        this.clearGivenInterval(this.autoRenewInterval)

        let userObj = JSON.parse(localStorage.getItem('userData'));
        console.log(`res`, res)
        console.log(`userObj`, userObj)
        const expiryTime = this.getExpiry(res.expires_in) 
        const expirationDate = new Date(new Date().getTime() + expiryTime);

        const user = new User(userObj.email,userObj.id, res.id_token, expirationDate, res.refresh_token);
        this.user.next(user);
        localStorage.setItem('userData', JSON.stringify(user));
        this.autoRenew(expiryTime); 
        this.expirationDate = expirationDate
    }

    handleError(error : HttpErrorResponse){ 
        let errorMessage = 'An invalid error occured';
                if(!error.error || !error.error.error){
                    return (errorMessage)
                } 
        switch(error.error.error.message){
            case 'EMAIL_NOT_FOUND' : errorMessage = "Email not found"; break;
            case 'INVALID_PASSWORD' : errorMessage = "Invalid password"; break;
            default: errorMessage = "An unknown error occured";
        }
        return errorMessage
    }

    autoLogin() {
            console.log("autologin")
            let userData = localStorage.getItem('userData')
            if(userData){
                const user: { email: string, id: string, _token: string, _tokenExpirationDate: string, _refreshToken: string } = JSON.parse(userData);
                const loadedUser = new User(user.email,user.id,user._token,new Date(user._tokenExpirationDate), user._refreshToken);
                this.user.next(loadedUser);
                // this.autoLogout(new Date(user._tokenExpirationDate).getTime() - new Date().getTime()); //convert to ms for setinterval
                this.autoRenew(loadedUser.tokenExpirationDate.getTime() - new Date().getTime()); //convert to ms for setinterval
            }
    }


    logout(){
        this.user.next(null);
        this.router.navigate(["/auth"]);
        localStorage.removeItem('userData');
        this.clearGivenInterval(this.logoutInterval)
        this.clearGivenInterval(this.autoRenewInterval)
    }

    clearGivenInterval(interval) {
        if (interval) {
            clearInterval(interval)
        }
        interval= null;
    }

    autoLogout(expiration : number){
        this.logoutInterval = setInterval( () => {
            this.logout();
        },expiration)
    }
    autoRenew(expiration: number) {
        if (expiration > 0) {
            console.log("In autorenew() method")
            this.autoRenewInterval = setInterval(() => {
                console.log("calling refreshtoken()")
                this.refreshToken();
            },expiration)
        }

    }

    getUserEmail(){
       return this.user.pipe(take(1),exhaustMap( user => {
           //console.log("AuthService:" + user.email)
            return user.email
        }));

    }

    refreshToken() {
        console.log("In refreshToken() method")
        let userData = localStorage.getItem('userData')
        if (userData) {
            console.log("user data in sessinstoage found")
            const user: { email: string, id: string, _token: string, _tokenExpirationDate: string, _refreshToken: string } = JSON.parse(userData);
            return this.http.post<ResponseData>(this.refreshTokenUrl, {
                grant_type: "refresh_token",
                refresh_token: user._refreshToken,
            }).pipe(
                catchError(error => {
                    return throwError(this.handleError(error))
                }),
                tap(res => this.handleAuthenticationAutoRefresh(res))
            ).subscribe(data => {
                console.log("Auto refresh succesful" ,data)
            }, err => {
                console.log("Auto refresh failed" , err)
            });
        }
    }




}