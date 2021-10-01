import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../dao/data.service';
import { Blog } from '../model/blog.model';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

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
  blogLimit : 2
  randomId
  constructor(private router: Router, private dataService: DataService, private authService: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.authService.getUserEmail().subscribe(email => {
      this.userEmail += email
    })
    this.dataService.getBlogsRecent(2).subscribe(res => {
      for (let key of Object.keys(res)) {
        
        this.blogs.push({
          id: key,
          value: res[key]
        });
      }  
      if (this.blogs.length > 0) {
        let randomInt = this.getRandomInt(this.blogs.length)
        this.randomBlog = this.blogs[randomInt].value
        this.randomId = this.blogs[randomInt].id
      }
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
  editBlog() {
    
    this.router.navigate(['edit'], { queryParams : { blogId : this.randomId} , queryParamsHandling : 'merge'}) 
  }
}
