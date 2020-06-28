import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/dao/data.service';
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  blogtext;
  @ViewChild('blogForm') blogForm;

  constructor(private dataservice : DataService, private sharedService: SharedService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    this.dataservice.saveBlog(
      {
        heading : form.value.heading,
        blogtext: form.value.blogtext,
        category : form.value.category,
        tags: form.value.tags,
        datecreated : new Date(),
        datemodified: new Date(),
        comments : [new Comment()]
      }
    ).subscribe( res => {
      console.log(res)
      this.sharedService.openSnackBar("Blog Saved successfully","Yay")
      form.reset()
    }, err => {
      console.log(err)
      this.sharedService.openSnackBar("Blog Saved failed","Naa")
    });

  }

  clearForm(){
      this.blogForm.clear();
  }
}
