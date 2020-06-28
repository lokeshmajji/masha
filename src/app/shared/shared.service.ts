import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn : 'root'
})
export class SharedService {

    tabChangeIndex = new Subject<number>();

    constructor(private snackBar : MatSnackBar){

    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
          horizontalPosition : 'center',
          verticalPosition : 'top'
          
        });
      }
}