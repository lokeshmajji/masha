import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { config } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/dialogs/confirm-dialog/confirm-dialog.component';
import { SharedService } from 'src/app/shared/shared.service';
import { DataService } from '../../dao/data.service';

@Component({
  selector: 'timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.css']
})
export class TimeLineViewComponent implements OnInit , OnDestroy {
  dragged = 0
  startpos = 0
  curpos = 0
  endpos = 735
  noofticks = 5
  stepsize = this.endpos / this.noofticks
  ticksarr = [this.startpos,...[...Array(this.noofticks).keys()].map(x => (x+1)* this.endpos/this.noofticks), this.endpos ]
  // datesarr = ["2021-01-01", "2021-02-01", "2021-03-01", "2021-04-01", "2021-05-01", , "2021-06-01"]
  datesset = new Set();
  datesarr = [];
  blogs = [
    {
      date: "2021-01-01",
      blog: `1111 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est! 1111 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere es
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      1111 Lorem ipsum dolor sit amet consectetur adipisicing elit.Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!
      `
    },
    {
      date: "2021-02-01",
      blog: "2222 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!"
    },
    {
      date: "2021-03-01",
      blog: "3333 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!"
    },
    {
      date: "2021-04-01",
      blog: "4444 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!"
    },
    {
      date: "2021-05-01",
      blog: "5555 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!"
    },
    {
      date: "2021-06-01",
      blog: "6666 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!"
    }
          ]
  slider = new FormControl();

  constructor(private dataService: DataService, private router: Router, private sharedService: SharedService, private dialog: MatDialog) { }

  blogItems = {}
  editor: Editor; //https://github.com/sibiraj-s/ngx-editor#demo
  html: '';
//   {
//     "blogtext": "<ul><li>Add Jenkins file to the project</li><li>Scan organization to get Updated Jenkins file</li><li>Run Build/Build with Parameters</li></ul>",
//     "category": "Tech",
//     "datecreated": "2020-05-20T17:47:57.777Z",
//     "datemodified": "2020-05-20T17:47:57.777Z",
//     "heading": "Jenkins",
//     "tags": "Jenkins"
// }
  loading: boolean = true
  isChecked : boolean = false
  sortDateDesc(d1: any, d2: any) {
    if (d1 < d2) return 1
    else if(d1 > d2) return -1
    else return 0
  }
  sortDateAsc(d1: any, d2: any) {
    if (d2 < d1) return 1
    else if(d2 > d1) return -1
    else return 0
  }
  categoriesset = new Set()
  tagsObj = {}
  categories = []
  ngOnInit(): void {

    this.editor = new Editor();
    
    this.fetchDataFromDB()
    
  }

  fetchDataFromDB() {
    this.dataService.getBlogs().subscribe(data => {
      this.processInput(data)
      this.processBlogs(this.blogItems);
    })
  }
 
  processInput(data) {

    // get the keys in the data
    // for each key create an object with date as key : [all the blogs as an array]
    Object.keys(data).forEach(key => {
      let blogObj = data[key]
      blogObj["id"] = key
      blogObj["toggle"] = false
      let catKey = blogObj["category"] || 'NA'
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
    // console.log('blog array structure',this.blogItems)
    // console.log(`this.tagsObj`, this.tagsObj)
  }

  filteredBlogs = {}
  processBlogs(blogItems) {
    // console.log(`Object.keys(blogItems)`, Object.keys(blogItems))
    this.datesarr = [...Object.keys(blogItems)].map(date =>  new Date(date+ "T06:00:01.000Z"))
    this.datesarr = this.datesarr.sort(this.sortDateAsc)
    this.categories = ['All',...this.categoriesset]
    this.setTicks()
  }
  
    // make sure to destory the editor
    ngOnDestroy(): void {
      this.editor.destroy();
    }
  
  
  
  setTicks() {
    this.noofticks = this.datesarr.length
    this.stepsize = this.endpos / this.noofticks
    this.ticksarr = [this.startpos, ...[...Array(this.noofticks).keys()].map(x => (x + 1) * this.endpos / this.noofticks), this.endpos]
    this.loading = false;
  }

  onDragStart(event: DragEvent) {
    console.log(`starting`, event);
    if (this.startpos === 0) this.startpos = event.clientY
    console.log('y=',event.clientY)
  }
  
  onDragEnd(event: DragEvent) {
    console.log('drag end', event);
    console.log('y=',event.clientY)
    this.changeDragged(event)
  }


  prevDrag
  nextDrag
  showEnd = true
  changeDragged(event) {
    if(event.clientY <= 0) this.dragged = 0
    if (event.clientY < this.endpos && event.clientY >= this.startpos) {
      this.prevDrag = event.clientY - 80 > 0 ?  event.clientY - 80 : undefined
      this.dragged = event.clientY - 40 > 0 ? event.clientY - 40 : 0
      this.nextDrag = event.clientY < this.endpos ?  event.clientY : undefined

    }
    if (event.clientY >= this.endpos) this.dragged = this.endpos - 10
    this.scrollToDiv(this.dragged)
  }
 
  resetDragPositions() {
    this.prevDrag = undefined
    this.nextDrag = undefined
    this.dragged = 0
    let datekey = this.datesarr[0].toISOString().split("T")[0]
    console.log(`datekey`, datekey)
    document.getElementsByClassName('blog-search')[0].scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
  }

  onDragOver($event) {
      $event.preventDefault()
    // console.log(event)
  }

  lineClick($event) {
    console.log($event)
  }

  blog
  prevTick
  currentTick
  nextTick
  scrollToDiv(curpos) {
    const endIndex = this.ticksarr.findIndex(v => v > curpos) 
    const startIndex = endIndex ? endIndex - 1 : 0
    this.currentTick = startIndex
    this.prevTick = startIndex > 2 ? startIndex - 1 : undefined
    this.nextTick = startIndex < this.ticksarr.length  - 2 ? startIndex + 1 : undefined
    // this.scroller.scrollToAnchor("" + startIndex);
    let datekey = this.datesarr[startIndex].toISOString().split("T")[0]
    document.getElementById(datekey).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
    
  }

  handleCategoryClick(event, category, tag) {
    if (this.clickedCategory != category) {
      this.toggleTag = false
    }
    this.clickedCategory = category
    this.toggleTag = !this.toggleTag
    this.filterBlogs(category,tag)
    this.processBlogs(this.filteredBlogs)
    this.resetDragPositions()
  }

  filterBlogs(category, tag) {
    if (category == 'All') {
      this.filteredBlogs = this.blogItems
      return
    } else if (category == 'NA') {
      this.filteredBlogs = this.blogItems
    }

    this.filteredBlogs = {}
    for (let item in this.blogItems) {
      const fb = this.blogItems[item].filter(blog => {
        if (!tag) return blog.category == (category == 'NA' ? '' : category)
        else return (blog.category == (category == 'NA' ? '' : category) ) && (blog.tags && blog.tags.indexOf(tag) >= 0)
      }
      )
      if(fb.length > 0) this.filteredBlogs[item] = fb
    }

    this.tempFilteredBlogs = Object.assign({},this.filteredBlogs)
    // console.log(this.tempFilteredBlogs)
   
  }

  tags = []
  filteredTags = []
  getTags(category) {
    this.tags = [...this.tagsObj[category]] || []
  }

  mouseEnter(category) {
    this.getTags(category)
  }
  mouseLeave() {
    
  }

  clickedCategory
  handleTagClick($event, category, tag) {
    this.filterBlogs(category,tag)
    this.processBlogs(this.filteredBlogs)
  }
  
  toggleTag : boolean = false
  handleTagShow(category) {
    return this.clickedCategory == category && this.toggleTag
  }

  searchInput
  tempFilteredBlogs
  keyPress(event: KeyboardEvent) {
    this.searchBlog()
  }
  keyDown($event) {
    if ($event.target.value.substring(0, $event.target.value.length - 1) == '' || $event.target.value.length <= 1) this.filteredBlogs = this.tempFilteredBlogs
    this.searchBlog()
  }

  searchBlog() {
    let tempBlogs = Object.assign({}, this.tempFilteredBlogs)
    let searchTag = this.searchInput ? this.searchInput.toLowerCase() : ''

    for (let key in tempBlogs) {
      let blogs = tempBlogs[key].filter(blog => {
        return blog.heading.toLowerCase().includes(searchTag) ||
          blog.category.toLowerCase().includes(searchTag) ||
          blog.tags.toLowerCase().includes(searchTag)
      })
      if (blogs.length > 0) tempBlogs[key] = blogs
      else delete tempBlogs[key]
    }
    this.filteredBlogs = tempBlogs
  }

  editBlog(key) {
    console.log(key)
    this.router.navigate(['edit'], { queryParams : { blogId : key} , queryParamsHandling : 'merge'}) 
  }

  getCounts() {
    return Object.keys(this.filteredBlogs).length
  }

  toggledKey
  handleToggleChange(key,blogNumber) {
    console.log(key,blogNumber)
    this.filteredBlogs[key][blogNumber]["toggle"] = !this.filteredBlogs[key][blogNumber]["toggle"]
  }

  getDate(date) {
    return new Date(date)
  }

  openDialog(event, blogId): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: "Confirm",
        message: "Do you wanna delete the item?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if (result == true) {
        this.onDeletePost(event, blogId);
      }
    });
  }
  onDeletePost(event: Event, blogId) {
    this.dataService.deletePost(blogId).subscribe(msg => {
      this.sharedService.openSnackBar('Post Deleted Successfully', 'Tadaaa')
      this.fetchDataFromDB()
    }, err => {
      console.log(err)
      this.sharedService.openSnackBar('Post Delete failed', 'Ding...')
    })
  }
}
