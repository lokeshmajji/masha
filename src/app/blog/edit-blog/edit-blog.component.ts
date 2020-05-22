import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/dao/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit, AfterViewChecked, OnDestroy {

  blogtext : string = "default blog ";
  heading : string = "default heading";
  tags : string[] = [];
  category : string = ""
  key : string;

  constructor(private dataservice : DataService) { }

  ngOnInit() {
   console.log(this.heading);
   this.dataservice.blogSubject.subscribe( item => {
    console.log("Received:--------"+ new Date())
    console.log( item.value.blogtext);
    this.blogtext = item.value.blogtext;
    this.heading = item.value.heading;
    this.tags = item.value.tags;
    this.category = item.value.category;
    this.key = item.key
    });
  }

  ngAfterViewChecked(){
    //console.log("After view checked");
    //console.log(this.heading)
  }

  ngOnDestroy()	{
    console.log("Destroying:" + this.heading)

  }

  onSubmit(form : NgForm){
    console.log(form)
    this.dataservice.updateBlog(this.key, {
      heading : form.value.heading,
      blogtext: form.value.blogtext,
      category : form.value.category,
      tags: form.value.tags,
      datecreated : new Date(),
      datemodified: new Date(),
      comments : [new Comment()]
    }).subscribe( res => {
       console.log(res)
    }, err => {
      console.log(err)
    })
  }

}
