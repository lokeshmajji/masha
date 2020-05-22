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

    signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDi8b7mjzP1mpNx_e87ZxItpoH7zF6yvcY'
    signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDi8b7mjzP1mpNx_e87ZxItpoH7zF6yvcY'

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
            tap(res => this.handleAuthentication(res))
        );
    }

    handleAuthentication(res : ResponseData){
        const expirationDate = new Date(new Date().getTime() + +res.expiresIn*1000);
        const user = new User(res.email,res.localId, res.idToken, expirationDate);
        this.user.next(user);
        this.autoLogout(+res.expiresIn * 1000); //convert to ms for setinterval
        localStorage.setItem('userData', JSON.stringify(user));
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

    autoLogin(){
            let userData = localStorage.getItem('userData')
            if(userData){
                const user : { email:string, id: string, _token:string, _tokenExpirationDate:string} = JSON.parse(userData);
                const loadedUser = new User(user.email,user.id,user._token,new Date(user._tokenExpirationDate));
                this.user.next(loadedUser);
                this.autoLogout(new Date(user._tokenExpirationDate).getTime() - new Date().getTime()); //convert to ms for setinterval
            }
            
    }


    logout(){
        this.user.next(null);
        this.router.navigate(["/auth"]);
        localStorage.removeItem('userData');
        if(this.logoutInterval){
            clearInterval(this.logoutInterval)
        }
        this.logoutInterval = null;
    }

    autoLogout(expiration : number){
        this.logoutInterval = setInterval( () => {
            this.logout();
        },expiration)
    }

    getUserEmail(){
       return this.user.pipe(take(1),exhaustMap( user => {
            return user.email
        }));

    }




}