import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/dao/data.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-timeline-view2',
  templateUrl: './timeline-view2.component.html',
  styleUrls: ['./timeline-view2.component.css']
})
export class TimelineView2Component implements OnInit {

  blogItems = {}
  categoriesset = new Set()
  tagsObj = {}
  filteredBlogs = {}
  tempFilteredBlogs = {}

  constructor(private dataService: DataService, private router: Router, private sharedService: SharedService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchDataFromDB()
  }

  fetchDataFromDB() {
    this.dataService.getBlogs().subscribe(data => {
      this.processInput(data)
    })
  }

  processInput(data) {

    // get the keys in the data
    // for each key create an object with date as key : [all the blogs as an array]
    // {
    //   
    //}
    Object.keys(data).forEach(key => {
      let blogObj = data[key]
      blogObj["id"] = key
      blogObj["toggle"] = false
      let catKey = blogObj["category"] || 'NA'
      if (catKey == 'NA') console.log(`blogObj`, blogObj)
      let tagsKey = this.tagsObj[catKey]

      this.categoriesset.add(catKey)

      const tagslocal = blogObj["tags"] || ""
      if (tagsKey) tagslocal.split(' ').forEach( x => this.tagsObj[catKey].add(x) )
      else this.tagsObj[catKey] = new Set([...tagslocal.split(' ')])
      

      const dateKey = blogObj["datecreated"].split("T")[0]
      // blogObj["datecreated"] = new Date(blogObj["datecreated"])
      dateKey in this.blogItems ? this.blogItems[dateKey].push(blogObj) : this.blogItems[dateKey] = [blogObj]
      // this.datesset.add(blogObj["datecreated"].split("T")[0])
    })
      
    this.filteredBlogs =Object.assign({}, this.blogItems)
    this.tempFilteredBlogs = Object.assign({}, this.filteredBlogs)
    //console.log('blog array structure', this.blogItems) 
    // console.log(`this.tagsObj`, this.tagsObj)
  }


}
