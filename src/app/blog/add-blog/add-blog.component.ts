import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/dao/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  blogtext;
  constructor(private dataservice : DataService) { }

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
    }, err => {
      console.log(err)
    });

  }
}
