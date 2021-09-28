import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/dao/data.service';
import { SharedService } from 'src/app/shared/shared.service';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-fullpage-view',
  templateUrl: './fullpage-view.component.html',
  styleUrls: ['./fullpage-view.component.css']
})
export class FullpageViewComponent implements OnInit, OnChanges {

  @Input() show: number = -1
  @Input() blog
  constructor(private dataService: DataService, private router: Router, private sharedService: SharedService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    console.log(`changes`, changes)
  }
  handlClose() {
    this.show = -1
  }
  toggle : boolean = false
  handleToggleChange() {
    this.toggle = !this.toggle
  }

  openDialog(event, id): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: "Confirm",
        message: "Do you wanna delete the item?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result == true) {
        this.onDeletePost();
      }
    });
  }

  onDeletePost() {
    this.dataService.deletePost(this.blog.id).subscribe(msg => {
      this.sharedService.openSnackBar('Post Deleted Successfully', 'Tadaaa')
    }, err => {
      console.log(err)
      this.sharedService.openSnackBar('Post Delete failed', 'Ding...')
    })
  }

  editBlog(key) {
    console.log(key)
    this.router.navigate(['edit'], { queryParams : { blogId : key} , queryParamsHandling : 'merge'}) 
  }

}


