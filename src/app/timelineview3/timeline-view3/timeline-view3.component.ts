import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from 'src/app/dao/data.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-timeline-view3',
  templateUrl: './timeline-view3.component.html',
  styleUrls: ['./timeline-view3.component.css']
})
export class TimelineView3Component implements OnInit {

  blogItems = {}
  categoriesset = new Set()
  tagsObj = {}
  filteredBlogs = {}
  tempFilteredBlogs = {}
  categories = []

  heading
  category
  tags
  blogtext

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

      catKey in this.blogItems ? this.blogItems[catKey].push(blogObj) : this.blogItems[catKey] = [blogObj]
    })
    
    this.categories = [...this.categoriesset]
    this.filteredBlogs =Object.assign({}, this.blogItems)
  }

  selectedChips = []

  selectedCategory
  selectedCategoryLength
  index = 0
  
  handleCarouselClick(step) {
  
    this.selectedCategoryLength = this.blogItems[this.selectedCategory].length
    console.log(`itemslength`, this.selectedCategoryLength )
    if (this.selectedCategoryLength  > 0) {
      if (step >= 1) {
        if (this.index < this.selectedCategoryLength  - 1) {
           this.index = this.index + step
         }
      } else {
        if (this.index >= 1) {
          this.index = this.index + step
        }
      }
    }

    this.setCard(this.selectedCategory, this.index)
    console.log(`this.heading `, this.heading )
  }

  setCard(cat, index) {
    console.log(`index`, index)
    this.heading = this.blogItems[cat][index].heading
    this.blogtext = this.blogItems[cat][index].blogtext
    this.category = this.blogItems[cat][index].category
    this.tags = this.blogItems[cat][index].tags
  }
  handleClick(cat) {
    this.selectedCategory = cat
    this.index = 0
    this.setCard(cat,0)
  }
}
