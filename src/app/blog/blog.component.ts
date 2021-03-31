import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  selectedIndex : number = 4;
  blogUpdated : boolean = false;

  selectedIndexChange(val :number ){
    this.selectedIndex=val;
    console.log(this.selectedIndex)
    if(this.selectedIndex == 1 && this.blogUpdated) {
      this.blogUpdated = false
      this.sharedService.blogReloadSubject.next(true)
  }
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
      this.sharedService.blogAddedSubject.subscribe( val => {
        console.log("Blog: Received " + val)
        this.blogUpdated = true;
      })
  }

}
