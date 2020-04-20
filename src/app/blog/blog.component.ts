import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogs = [{
    id : 1,
    heading: 'First',
    blogtext : 'Something goes here'
  },
  {
    id : 2,
    heading: 'Second',
    blogtext : 'Something goes here'
  }]
  constructor() { }

  ngOnInit() {
  }

}
