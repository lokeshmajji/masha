import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { DataService } from '../dao/data.service';

@Component({
  selector: 'app-test-vis',
  templateUrl: './test-vis.component.html',
  styleUrls: ['./test-vis.component.css']
})
export class TestVisComponent implements OnInit , OnDestroy {
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

  constructor(private scroller: ViewportScroller, private router: Router,private dataService: DataService) { }

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
  
  sortDate(d1: any, d2: any) {
    if (typeof d1 === "object") {
      console.log("sorting ")
      d1 = new Date(d1["datecreated"])
      d2 = new Date(d2["datecreated"])
    }
    if (d1 < d2) return 1
    else if(d1 > d2) return -1
    else return 0
  }
  categoriesset = new Set()
  categories = []
  ngOnInit(): void {

    this.editor = new Editor();
    
    this.dataService.getBlogs().subscribe(data => {
      Object.keys(data).forEach(key => {
        this.categoriesset.add(data[key]["category"])
        const dateKey = data[key]["datecreated"].split("T")[0]
        dateKey in this.blogItems ?  this.blogItems[dateKey].push(data[key]) : this.blogItems[dateKey ] = [data[key]]
        this.datesset.add(data[key]["datecreated"].split("T")[0])
      })

      // this.datesarr = [...this.datesset].map((date: string) => new Date(date))
      this.datesarr = [...Object.keys(this.blogItems)].map((date: string) => new Date(date))
      // this.blogItems.sort(this.sortDate)
      // this.datesarr.sort(this.sortDate)
      this.categories = [...this.categoriesset]
      console.log(this.blogItems)
      this.setTicks()
    })
    
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
  setTicks1() {
    this.noofticks = 5
    this.stepsize = this.endpos / this.noofticks
    this.ticksarr = [this.startpos, this.endpos / 2, this.endpos]
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

  // Month wise
  // Day Wise

  // show first 1-5 6 end date
  // when scrolled to 5, load 6-10 11 end date
  //
  //

}
