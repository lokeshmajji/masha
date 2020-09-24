import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/dao/data.service';
import { NgForm } from '@angular/forms';
import { BlogComment} from '../../model/comment.model'
import { AuthService } from 'src/app/auth/auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view-single',
  templateUrl: './view-single.component.html',
  styleUrls: ['./view-single.component.css']
})
export class ViewSingleComponent implements OnInit {

  heading : string;
  blogtext : string;
  tags : string[];
  category: string;
  key : string;
  userEmail : string;
  comments = []
  commenttext : any;
  currentBlogItem : any;

  constructor(private dataservice : DataService, private authService : AuthService, private sharedService : SharedService,private dialog: MatDialog) { }

  ngOnInit() {
    
   this.dataservice.blogSubject.subscribe( item => {
    //console.log("Received:--------"+ new Date())
    //console.log( item.value.blogtext);
    this.currentBlogItem = item;
    this.loadPostAndComments(item)
    });
  }

  loadPostAndComments(item){
    this.blogtext = item.value.blogtext;
    this.heading = item.value.heading;
    this.tags = item.value.tags;
    this.category = item.value.category;
    this.key = item.key
    this.comments.splice(0)

      //console.log("Try to fetch comments with key:" + this.key)
      this.dataservice.getComments(this.key.trim()).subscribe( res => {
        //console.log(res);
        if(res) {
          for(let key of Object.keys(res)){
            this.comments.push({
              key : key,
              value : res[key]
            });
           }
         }
      }, err => {
          console.log(err);
      });
   }

  onSubmit( form : NgForm){
    //console.log(form.value);

    this.dataservice
         .addComment(this.key, new BlogComment(form.value.commentheading, form.value.commenttext))
         .subscribe( res => { 
           //console.log(res)
           this.sharedService.openSnackBar('New Comment saved successfully','Yayyy')
           this.loadPostAndComments(this.currentBlogItem)
           form.reset();
        } , err => { console.log(err)});
  }

  updateComment($event :Event, comment : { key: string, value: Comment}){
    this.dataservice
    .updateComment(this.key, comment.key, comment.value)
    .subscribe( res => { //console.log(res)
      this.sharedService.openSnackBar('Comment updated successfully','Yayyy')
    } , err => { console.log(err)});
  }

  deleteComment($event :Event, comment : { key: string, value: Comment}){
    this.dataservice
    .deleteComment(this.key, comment.key)
    .subscribe( res => { console.log(res)

      this.sharedService.openSnackBar('Comment Deleted successfully','Yayyy')
      this.loadPostAndComments(this.currentBlogItem)
    } , err => { console.log(err)});
  }


  openDialog(event, comment): void {
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
        this.deleteComment(event, comment);
      }
    });
  }
}
