import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { config } from 'rxjs';

@Component({
  selector: 'app-test-vis',
  templateUrl: './test-vis.component.html',
  styleUrls: ['./test-vis.component.css']
})
export class TestVisComponent implements OnInit {
  dragged = 0
  startpos = 10
  curpos = 0
  endpos = 730
  noofticks = 5
  stepsize = this.endpos / this.noofticks
  ticksarr = [this.startpos,...[...Array(this.noofticks).keys()].map(x => (x+1)* this.endpos/this.noofticks), this.endpos ]
  datesarr = ["2021-01-01", "2021-02-01", "2021-03-01", "2021-04-01", "2021-05-01", , "2021-06-01"]
  blogs = [
    {
      date: "2021-01-01",
      blog: "1111 Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis incidunt repudiandae ratione ullam numquam consequatur, dignissimos corrupti, voluptas eveniet atque voluptate sunt dolorem architecto non nisi? Amet quaerat facere est!"
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

  constructor() { }

  ngOnInit(): void {
       console.log(this.ticksarr)
  }

  onDragStart(event: DragEvent) {
    console.log(`starting`, event);
    if (this.startpos === 0) this.startpos = event.y
    console.log('y=',event.y)
  }
  
  onDragEnd(event: DragEvent) {
    console.log('drag end', event);
    console.log('y=',event.y)
    console.log('curpos=', this.curpos)
    console.log('dragged=',this.dragged)
    if (event.y < this.endpos && event.y >= this.startpos) this.dragged = event.y
    if(event.y >= this.endpos) this.dragged = this.endpos - 10
    this.getTickRange(this.dragged)
  }

  lineClick($event) {
    console.log($event)
  }

  blog
  getTickRange(curpos) {
    const endIndex = this.ticksarr.findIndex(v => v > curpos)
    const startIndex = endIndex - 1
    this.blog = this.blogs[startIndex].blog

    
  }

}
