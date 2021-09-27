import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../dao/data.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor(private dataService: DataService, private router: Router, private sharedService: SharedService, private dialog: MatDialog) { }


  fetchDataFromDB() {
    return this.dataService.getBlogs().subscribe(data => {
      return this.processInput(data)
    })
  }

  processInput(data) {
    return new Promise((resolve, reject) => {
      resolve("success")
    })
  }
}
