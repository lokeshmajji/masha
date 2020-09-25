import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../dao/data.service';
import { Blog } from '../model/blog.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , AfterViewInit{

  loading : boolean = false;
  blogs = []
  randomBlog : Blog
  userEmail = ''
  constructor(private dataService: DataService, private authService: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.authService.getUserEmail().subscribe(email => {
      //console.log(email)
      this.userEmail += email
    })
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
      //console.log(this.randomBlog)   
      
      this.loading = false;
    }
  , err => {
     console.log(err)
     this.loading = false;
  })
  
  }
  ngAfterViewInit(){

  }

   getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
}
