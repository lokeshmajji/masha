import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { config } from 'rxjs';
import { DataService } from '../dao/data.service';

@Component({
  selector: 'app-test-vis',
  templateUrl: './test-vis.component.html',
  styleUrls: ['./test-vis.component.css']
})
export class TestVisComponent implements OnInit , OnDestroy {
  dragged = 0
  startpos = 10
  curpos = 0
  endpos = 730
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

  blogItems = []
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
  loading : boolean = true
  ngOnInit(): void {

    this.editor = new Editor();

    this.dataService.getBlogs().subscribe(data => {
      Object.keys(data).forEach(key => {
        this.blogItems.push(data[key])
        this.datesset.add(data[key]["datecreated"].split("T")[0])
      })
      console.log(this.blogItems)
      this.datesarr = [...this.datesset]
      this.noofticks = this.datesarr.length
      this.stepsize = this.endpos / this.noofticks
      this.ticksarr = [this.startpos, ...[...Array(this.noofticks).keys()].map(x => (x + 1) * this.endpos / this.noofticks), this.endpos]
      this.loading = false;
    })
    
  }
    // make sure to destory the editor
    ngOnDestroy(): void {
      this.editor.destroy();
    }

  onDragStart(event: DragEvent) {
    console.log(`starting`, event);
    if (this.startpos === 0) this.startpos = event.clientY
    console.log('y=',event.clientY)
  }
  
  onDragEnd(event: DragEvent) {
    console.log('drag end', event);
    console.log('y=',event.clientY)
    console.log('dragged=', this.dragged)
    if(event.clientY <= 0) this.dragged = 0
    if (event.clientY < this.endpos && event.clientY >= this.startpos) this.dragged = event.clientY - 40 > 0 ? event.clientY - 40 : 0
    if(event.clientY >= this.endpos) this.dragged = this.endpos - 10 
    this.getTickRange(this.dragged)
  }

  onDragOver($event) {
    // console.log(event)
  }

  lineClick($event) {
    console.log($event)
  }

  blog
  getTickRange(curpos) {
    const endIndex = this.ticksarr.findIndex(v => v > curpos) 
    const startIndex = endIndex ? endIndex - 1 : 0
    
    
    // this.scroller.scrollToAnchor("" + startIndex);
    document.getElementById("" + startIndex).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest"
    });
    
  }

}
