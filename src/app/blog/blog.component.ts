import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  selectedIndex : number = 1;

  selectedIndexChange(val :number ){
    this.selectedIndex=val;
  }

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
  constructor(public sharedService : SharedService) { }

  ngOnInit() {
      this.sharedService.tabChangeIndex.subscribe( index => {
        this.selectedIndex = index;
      })
  }

}
