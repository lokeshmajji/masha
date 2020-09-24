import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../dao/data.service';
import { Blog } from '../model/blog.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , AfterViewInit{

  blogs = []
  randomBlog : Blog
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getBlogs().subscribe(res => {
      for (let key of Object.keys(res)) {
        //console.log(key)
        //console.log(res[key])
        this.blogs.push({
          key: key,
          value: res[key]
        });
      }  
      //console.log(this.blogs[2])
      this.randomBlog = this.blogs[this.getRandomInt(this.blogs.length)].value
      console.log(this.randomBlog)   
    }
  )
  
  }
  ngAfterViewInit(){

  }

   getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
