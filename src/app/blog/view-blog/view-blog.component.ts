import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/dao/data.service';
import { Router } from '@angular/router';
import { Blog } from 'src/app/model/blog.model';


@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  blogs  = []
  searchInput : string = ''
  @Output('editBlogItem') editBlogEvent = new EventEmitter<{ key: string, blog: Blog}>();
  
  constructor(private dataService : DataService,private router:  Router) { }

  ngOnInit() {
   this.dataService.getBlogs().subscribe( res => {

        for(let key of Object.keys(res)){
            //console.log(key)
            //console.log(res[key])
            this.blogs.push({
              key : key,
              value : res[key]
            });
        }
        // for(let obj of Object.values(res)){
        //       console.log(obj)
        //       this.blogs.push(obj);
        // }
   }, err => {
     console.log(err);
   });

  //  var quill = new Quill('#quill-container', {
  //   modules: {
  //     toolbar: [
  //       [{ header: [1, 2, false] }],
  //       ['bold', 'italic', 'underline'],
  //       ['image', 'code-block']
  //     ]
  //   },
  //   scrollingContainer: '#scrolling-container', 
  //   placeholder: 'Compose an epic...',
  //   theme: 'bubble'
  // });
   
  }

  onEdit(event : Event, blogkv: {key: string, value: Blog}){
    console.log("Sending:" + blogkv.key + " at " + new Date())
    this.dataService.blogSubject.next(blogkv);
    this.router.navigate(['blog','edit'])
  }

  onAddComment(event : Event){
      
  }

  onFullPageView(event : Event, blogkv: {key: string, value: Blog}){
    console.log("Sending to full page view:" + blogkv.key + " at " + new Date())
    this.dataService.blogSubject.next(blogkv);
    this.router.navigate(['blog','fullview'])
  }

  keypressEvent(event){
      //console.log(event);
      //console.log(this.searchInput)
  }

  onDeletePost(event : Event,post){
      this.dataService.deletePost(post.key).subscribe( msg => {
        console.log(msg)
      }, err => {
        console.log(err)
      })
  }

}
