import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataService } from 'src/app/dao/data.service';
import { Router } from '@angular/router';
import { Blog } from 'src/app/model/blog.model';
import { SharedService} from '../../shared/shared.service'
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit,OnDestroy {

  blogs  = []
  categories = new Set<string>().add('All')
  searchInput : string = ''
  searchInputFilter : string = ''
  selected = 'All'
  loading : boolean
  sortOrder : boolean = false;
  blogsPager = []
  currentPage : number = 1;
  pageSize : number = 10;
  currentpagessize : number

  @Output('editBlogItem') editBlogEvent = new EventEmitter<{ key: string, blog: Blog}>();
  subs: Subscription;
  
  constructor(private dataService : DataService,private router:  Router, private sharedService : SharedService, private dialog: MatDialog) { }

  ngOnInit() {
    console.log("View Blog: Init")
    this.loading = true;
   this.subs = this.dataService.getBlogs().subscribe( res => {

        for(let key of Object.keys(res)){
            //console.log(key)
            //console.log(res[key])
            this.blogs.push({
              key : key,
              value : res[key]
            });
            this.categories.add( res[key].category == "" ? 'NA' : res[key].category )
        }
        this.handleFirstPage();
        this.loading = false;

        // for(let obj of Object.values(res)){
        //       console.log(obj)
        //       this.blogs.push(obj);
        // }
   }, err => {
     console.log(err);
     this.loading = false;
   });
   
  }

  handleFirstPage(){
    console.log(this.pageSize)
    if(this.blogs.length <= this.pageSize){
      this.blogsPager = this.blogs;
    } else {
      this.blogsPager = []
      for(let i=0; i < this.pageSize; i++) this.blogsPager.push(this.blogs[i]);
    }
  }


  handleNext(event){
    //console.log("Blog Count:" + this.blogs.length)
    this.loading = true;
    this.currentpagessize = this.currentPage * this.pageSize
    //console.log("current page size:" + this.currentpagessize )
     let limit = this.blogs.length / this.pageSize;
     //console.log("Limit : " + limit)

    if(this.currentPage <= limit){
      this.currentPage++
      this.blogsPager = []
      for(let i= this.currentpagessize; i <  this.blogs.length; i++) 
      {
       // console.log( this.currentpagessize + " " +  this.currentpagessize + " " + this.pageSize )
        this.blogsPager.push(this.blogs[i]);
      }
    }
    this.loading = false;
  }

  handlePrev(event){
    this.currentpagessize = this.currentPage * this.pageSize;
    //console.log("page size = " +this.currentpagessize)
    if(this.currentPage > 1) {
        this.currentPage--;
        this.blogsPager = []
        for(let i = (this.currentPage -1) * this.pageSize; i < this.currentPage * this.pageSize; i++){
          //console.log("i=" + i )
          this.blogsPager.push(this.blogs[i]);
        }
    }
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
    this.searchInput = ''
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

  openDialog(event,blog): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
         title : "Confirm",
         message : "Do you wanna delete the item?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed' + result);
      if(result == true) {
        this.onDeletePost(event,blog);
      }
    });
  }
  onCategoryChange(event) {
    console.log("filter")
    //this.blogs = this.blogs.filter(x => x.value.category == this.selected)
  }

  onSort(event){
    //console.log(this.blogs[0])
    this.sortOrder = !this.sortOrder
    if(this.sortOrder){
      this.blogs.sort((x,y) => Date.parse(x.value.datemodified) - Date.parse(y.value.datemodified)  )
    } else {
      this.blogs.sort((x,y) => Date.parse(y.value.datemodified) - Date.parse(x.value.datemodified)  )
    }

  }
  ngOnDestroy()	{
    console.log("Destroying: ViewBlog")
    this.subs.unsubscribe();
  }

}
