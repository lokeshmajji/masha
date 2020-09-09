import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/dao/data.service';
import { Router } from '@angular/router';
import { Blog } from 'src/app/model/blog.model';
import { SharedService} from '../../shared/shared.service'

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit,OnDestroy {

  blogs  = []
  searchInput : string = ''
  searchInputFilter : string = ''

  @Output('editBlogItem') editBlogEvent = new EventEmitter<{ key: string, blog: Blog}>();
  
  constructor(private dataService : DataService,private router:  Router, private sharedService : SharedService) { }

  ngOnInit() {
    console.log("View Blog: Init")
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
    this.sharedService.tabChangeIndex.next(2)
    this.router.navigate(['blog','edit'])
  }

  onAddComment(event : Event,blogkv: {key: string, value: Blog}){
      
  }

  onFullPageView(event : Event, blogkv: {key: string, value: Blog}){
    console.log("Sending to full page view:" + blogkv.key + " at " + new Date())
    this.dataService.blogSubject.next(blogkv);
    this.sharedService.tabChangeIndex.next(3)
    this.router.navigate(['blog','fullview'])
  }

  keypressEvent(event){
      //console.log(event);
      //console.log(this.searchInput)
  }
  handleSearch(event){
    this.searchInputFilter = this.searchInput;
  }
  handleClear(event){
    this.searchInputFilter = ''
  }

  onDeletePost(event : Event,post){
      this.dataService.deletePost(post.key).subscribe( msg => {
        //console.log(msg)
        this.sharedService.openSnackBar('Post Deleted Successfully','Tadaaa')
      }, err => {
        console.log(err)
        this.sharedService.openSnackBar('Post Delete failed','Ding...')
      })
  }

  ngOnDestroy()	{
    console.log("Destroying: ViewBlog")
  }

}
