import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler){
       return this.authService.user.pipe(take(1), exhaustMap(user => {
        console.log("Original Req:" + req)
           if(!user){
               return next.handle(req);
           }
            const modifiedReq = req.clone({
                params : new HttpParams().append("auth",user.token)
            })
            console.log("Modified Req:" + modifiedReq)
            return next.handle(modifiedReq);
        }));

    }
}