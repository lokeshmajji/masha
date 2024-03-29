import { Component, OnInit, Output, EventEmitter, OnDestroy, AfterViewInit, OnChanges } from '@angular/core';
import { DataService } from 'src/app/dao/data.service';
import { Router } from '@angular/router';
import { Blog } from 'src/app/model/blog.model';
import { SharedService } from '../../shared/shared.service'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { Subscription, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  blogs = []
  categories = new Set<string>().add('All')
  tags = new Map<string, number>();
  searchInput: string = ''
  searchInputFilter: string = ''
  selected = 'All'
  loading: boolean
  sortOrder: boolean = true;
  blogsFiltered = []
  blogsPager = []
  currentPage: number = 0;
  pageSize: number = 5;
  currentpagessize: number
  filtered: boolean = false
  page1: number = 1
  page2: number = 2
  page3: number = 3
  page4: number = 4
  showPage1: boolean = false;
  showPage2: boolean = false;
  showPage3: boolean = false;
  showPage4: boolean = false;
  selectedTagValue

  tagsFormControl = new FormControl();
  tagsArr = []

  tagsControl = new FormControl();
  tagsOptions: string[] = [];
  filteredTagsOptions: Observable<string[]>;


  @Output('editBlogItem') editBlogEvent = new EventEmitter<{ key: string, blog: Blog }>();
  subs: Subscription;

  ngAfterViewInit(){
    console.log("NgAfterViewInit: ViewBlog: ")
  }
  ngOnChanges()	{
    console.log("ngOnChanges: ViewBlog: ")

  }

  constructor(private dataService: DataService, private router: Router, private sharedService: SharedService, private dialog: MatDialog) { }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.tagsOptions.filter(option => option.toLowerCase().includes(filterValue));
  }
  ngOnInit() {
    console.log("View Blog: Init" + this.currentPage)
    this.fetchData(true); 
    // this.sharedService.blogAddedSubject.subscribe(val => {
    //   console.log("blog added/updated")
    //   this.fetchData(false)
    //   //this.handleFirstPage()
    // })


    this.sharedService.blogReloadSubject.subscribe(val=> {
      console.log("blog added/updated")
      this.fetchData(false)
      this.handleFirstPage()
    })
  }

  fetchData(initialLoad : boolean,keyDeleted? : string ){

    this.loading = true;
    this.blogs = []
    this.categories.clear();
    this.categories.add('All')
    this.blogsPager = this.blogsPager.filter(item => item.key != keyDeleted) 
    //this.blogsFiltered.filter(item => item.key != keyDeleted) 
    this.subs = this.dataService.getBlogs().subscribe(res => {
                                              for (let key of Object.keys(res)) {
                                                //console.log(key)
                                                //console.log(res[key])
                                                this.blogs.push({
                                                  key: key,
                                                  value: res[key]
                                                });
                                              this.categories.add(res[key].category == "" ? 'NA' : res[key].category)
                                              
                                                if (res[key].tags) {
                                                  res[key].tags.split(" ").forEach(element => {
                                                    if (element == "") {
                                                      //console.log("NA")
                                                      if (this.tags.get("NA")) this.tags.set("NA", this.tags.get("NA") + 1)
                                                      else this.tags.set("NA", 1)
                                                    }
                                                    else if (this.tags.has(element)) this.tags.set(element, this.tags.get(element) + 1);
                                                    else {
                                                      this.tags.set(element, 1)
                                                    }
                                                  });
                                                }
                                            }
                                            //console.log(this.tags.values)
                                            for(let tag of this.tags.keys()) {
                                              this.tagsArr.push(tag + " : " + this.tags.get(tag))
                                              this.tagsOptions.push(tag)
                                            }
                                            this.filteredTagsOptions = this.tagsControl.valueChanges
                                            .pipe(
                                              startWith(''),
                                              map(value => this._filter(value))
                                            );

                                            // this.handleFirstPage();
                                            // this.blogsFiltered = this.blogs;
                                            //this.blogsPager = this.blogs;
                                            if(initialLoad) this.handleNext(null)
                                            //this.handleNextV2();
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

  handleFirstPage() {
    console.log(this.blogs.length)
    if (this.blogs.length <= this.pageSize) {
      this.blogsPager = this.blogs;
    } else {
      // this.blogsPager = this.blogs
      for (let i = 0; i < this.pageSize; i++) this.blogsPager.push(this.blogs[i]);
    }
  }

  handleRefresh(event){
    this.fetchData(false); 
  }
  handleNext(event) {
    console.log("Blog Count:" + this.blogs.length)
    this.loading = true;

    let limit;
    let tempBlog
    if (this.filtered) {
      limit = this.blogsFiltered.length / this.pageSize;
      tempBlog = this.blogsFiltered
      this.currentpagessize = this.currentPage * this.pageSize
      console.log("current page size:" + this.currentpagessize)
      console.log("processing filtered")
    } else {
      limit = this.blogs.length / this.pageSize;
      tempBlog = this.blogs
      //this.currentPage = 0;
      this.currentpagessize = this.currentPage * this.pageSize
      console.log("current page size:" + this.currentpagessize)
    }
    console.log("Limit : " + limit)

    if (this.currentPage < limit) {
      this.currentPage++
      this.blogsPager = []
      let looplimit
      if (tempBlog.length - this.currentpagessize > this.pageSize) {
        console.log("Difference:" + (tempBlog.length - this.currentpagessize))
        looplimit = this.currentpagessize + this.pageSize
      }
      else looplimit = (this.currentpagessize) - (this.currentpagessize - tempBlog.length)
      console.log("Loop Limit:" + looplimit)
      for (let i = this.currentpagessize; i < looplimit; i++) {
        // console.log( this.currentpagessize + " " +  this.currentpagessize + " " + this.pageSize )
        this.blogsPager.push(tempBlog[i]);
      }
    }
    this.loading = false;
  }

  handleLast(event) {
    console.log("Blog Count:" + this.blogs.length)
    this.loading = true;

    let limit;
    let tempBlog
    if (this.filtered) {
      limit = this.blogsFiltered.length / this.pageSize;
      this.currentPage = Math.ceil(limit)
      tempBlog = this.blogsFiltered
      this.currentpagessize = (this.currentPage - 1) * this.pageSize
      console.log("current page size:" + this.currentpagessize + " current page:" + this.currentPage)
      console.log("processing filtered")
    } else {
      limit = this.blogs.length / this.pageSize;
      tempBlog = this.blogs
      this.currentPage = Math.ceil(limit)
      //this.currentPage = 0;
      this.currentpagessize = (this.currentPage - 1) * this.pageSize
      console.log("current page size:" + this.currentpagessize + " current page:" + this.currentPage)
    }
    console.log("Limit : " + limit)



    this.blogsPager = []
    let looplimit
    if (tempBlog.length - this.currentpagessize > this.pageSize) {
      console.log("Difference:" + (tempBlog.length - this.currentpagessize))
      looplimit = this.currentpagessize + this.pageSize
    }
    else looplimit = (this.currentpagessize) - (this.currentpagessize - tempBlog.length)
    console.log("Loop Limit:" + looplimit)
    for (let i = this.currentpagessize; i < looplimit; i++) {
      // console.log( this.currentpagessize + " " +  this.currentpagessize + " " + this.pageSize )
      this.blogsPager.push(tempBlog[i]);
    }


    this.loading = false;
  }
  handlePrev(event) {
    let tempBlog
    if (this.filtered) {
      tempBlog = this.blogsFiltered
    } else {
      tempBlog = this.blogs;
    }
    this.currentpagessize = this.currentPage * this.pageSize;
    console.log("page size = " + this.currentpagessize)
    if (this.currentPage > 1) {
      this.currentPage--;
      this.blogsPager = []
      for (let i = (this.currentPage - 1) * this.pageSize; i < this.currentPage * this.pageSize; i++) {
        //console.log("i=" + i )
        this.blogsPager.push(tempBlog[i]);
      }
    }
  }

  handleFirst(event) {
    console.log("Blog Count:" + this.blogs.length)
    this.loading = true;

    let limit;
    let tempBlog
    if (this.filtered) {
      limit = this.blogsFiltered.length / this.pageSize;
      this.currentPage = 1
      tempBlog = this.blogsFiltered
      this.currentpagessize = (this.currentPage - 1) * this.pageSize
      console.log("current page size:" + this.currentpagessize + " current page:" + this.currentPage)
      console.log("processing filtered")
    } else {
      limit = this.blogs.length / this.pageSize;
      tempBlog = this.blogs
      this.currentPage = 1
      //this.currentPage = 0;
      this.currentpagessize = (this.currentPage - 1) * this.pageSize
      console.log("current page size:" + this.currentpagessize + " current page:" + this.currentPage)
    }
    console.log("Limit : " + limit)



    this.blogsPager = []
    let looplimit
    if (tempBlog.length - this.currentpagessize > this.pageSize) {
      console.log("Difference:" + (tempBlog.length - this.currentpagessize))
      looplimit = this.currentpagessize + this.pageSize
    }
    else looplimit = (this.currentpagessize) - (this.currentpagessize - tempBlog.length)
    console.log("Loop Limit:" + looplimit)
    for (let i = this.currentpagessize; i < looplimit; i++) {
      // console.log( this.currentpagessize + " " +  this.currentpagessize + " " + this.pageSize )
      this.blogsPager.push(tempBlog[i]);
    }


    this.loading = false;
  }

  onEdit(event: Event, blogkv: { key: string, value: Blog }) {
    console.log("Sending:" + blogkv.key + " at " + new Date())
    this.dataService.blogSubject.next(blogkv);
    this.sharedService.tabChangeIndex.next(2)
    this.router.navigate(['blog', 'edit'])
  }

  onAddComment(event: Event, blogkv: { key: string, value: Blog }) {

  }

  onFullPageView(event: Event, blogkv: { key: string, value: Blog }) {
    console.log("Sending to full page view:" + blogkv.key + " at " + new Date())
    this.dataService.blogSubject.next(blogkv);
    this.sharedService.tabChangeIndex.next(3)
    this.router.navigate(['blog', 'fullview'])
  }

  keypressEvent(event) {
    //console.log(event);
    //console.log(this.searchInput)
  }
  handleSearch(event) {
    this.hidePageNos();
    this.searchInputFilter = this.searchInput.toLowerCase();
    this.blogsFiltered = []
    this.blogsPager = []
    console.log("searching for " + this.searchInputFilter)
    if (this.searchInputFilter !== undefined && this.searchInputFilter !== ' ') {
      this.blogsFiltered = this.blogs
        .filter(x => 
          {
         
            return (( x.value.heading.toLowerCase().includes(this.searchInputFilter) ||    
              (this.tagsFormControl.value != "" && x.value.tags.includes(this.tagsFormControl.value)) 
            )
            && 
            (
              (x.value.category == this.selected || this.selected == 'All') || 
              (this.selected == 'NA' && x.value.category == '')  
            
            ));

          }
         )
      //this.blogsPager = this.blogsFiltered
    } else {
      console.log("Else case")
      this.blogsFiltered = this.blogs
        .filter(x => ((x.value.category == this.selected || this.selected == 'All') || (this.selected == 'NA' && x.value.category == ''))
        )
    }
    console.log(this.blogsFiltered)
    this.filtered = true;
    this.currentPage = 0;
    this.handleNext(null)
  }

  handleAutoCompleteSelectChange(event){
    let selectedTag = event.option.value
    //console.log(selectedTag)
    this.blogsFiltered = this.blogs
        .filter(x => {
          //console.log(x.value.tags);
          return x.value.tags.toLowerCase().includes(selectedTag.toLowerCase())
          }
        )
        this.filtered = true;
        this.currentPage = 0;
        this.handleNext(null)
  }

  handleTagOpenChange(event){
    let searchArr = this.tagsFormControl.value ? this.tagsFormControl.value.map(x => x.split(":")[0].trim()) : null
    if(searchArr == null || searchArr.length <= 0) {
      //console.log("Return from the search")
      return;
    }
  }
  handleTagChange(event) {
    //console.log(event);

    let searchArr = this.tagsFormControl.value ? this.tagsFormControl.value.map(x => x.split(":")[0].trim()) : null
    if(searchArr == null || searchArr.length <= 0) {
      console.log("Return from the search")
      this.filtered = false;
    this.currentPage = 0;
    this.handleNext(null)
      return;
    }

    this.hidePageNos();
    this.searchInputFilter = this.searchInput;
    this.blogsFiltered = []
    this.blogsPager = []

    if (this.searchInputFilter !== undefined && this.searchInputFilter !== ' ') {
      this.blogsFiltered = this.blogs
        .filter(x => {
                      //console.log(x.value.tags + " :comparing: " +  searchArr.filter(y => (x.value.tags.includes(y)  ) ) )
                      //console.log(searchArr.filter(y => (x.value.tags.includes(y) )))
                      
                      return searchArr.filter(y => { 
                          //console.log(y + " : " + x.value.tags)
                          if(y == "NA") return x.value.tags == ""
                          else return (x.value.tags.includes(y))
                      
                       }).length > 0 
                     }
               )
      //this.blogsPager = this.blogsFiltered
    } else {
      this.blogsFiltered = this.blogs
        .filter(x => (x.value.tags.includes(this.tagsFormControl.value))
        )
    }
    console.log("Filtered Blogs")
    console.log(this.blogsFiltered)
    this.filtered = true;
    this.currentPage = 0;
    this.handleNext(null)
  }

  handleClear(event) {
    this.searchInputFilter = ''
    this.searchInput = ''
    this.currentPage = 0;
    this.filtered = false
    this.selected = 'All'
    this.selectedTagValue = ''
    this.handleNext(null)
    this.hidePageNos();
  }
  hidePageNos(){
    this.showPage1 = false
    this.showPage2 = false
    this.showPage3 = false
    this.showPage4 = false
  }

  onDeletePost(event: Event, post) {
    this.dataService.deletePost(post.key).subscribe(msg => {
      //console.log(msg)
      this.sharedService.openSnackBar('Post Deleted Successfully', 'Tadaaa')
      this.fetchData(false,post.key); 
    }, err => {
      console.log(err)
      this.sharedService.openSnackBar('Post Delete failed', 'Ding...')
    })
  }

  openDialog(event, blog): void {
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
        this.onDeletePost(event, blog);
      }
    });
  }
  onCategoryChange(event) {
    console.log("filter")
    //this.blogs = this.blogs.filter(x => x.value.category == this.selected)

    //this.blogsPager = this.blogsFiltered

    //  console.log(this.blogsFiltered)
    //  this.filtered = true
    //  this.currentPage = 0;
    //  this.handleNext(null)

    this.handleSearch(null)
  }

  onTagChange(event){
    console.log("tag change")
    this.handleSearch(null)

  }

  handlePageNumberChange(event) {
    this.currentPage = 0
    this.handleSearch(null)

  }

  onSortGlobal(event) {
    //console.log(this.blogs[0])
    this.sortOrder = !this.sortOrder
    if (this.sortOrder) {
       if(this.filtered) this.blogsFiltered.sort((x, y) => Date.parse(x.value.datemodified) - Date.parse(y.value.datemodified))
       else this.blogs.sort((x, y) => Date.parse(x.value.datemodified) - Date.parse(y.value.datemodified))
    } else {
      if(this.filtered) this.blogsFiltered.sort((x, y) => Date.parse(y.value.datemodified) - Date.parse(x.value.datemodified))
      else this.blogs.sort((x, y) => Date.parse(y.value.datemodified) - Date.parse(x.value.datemodified))
    }
    this.handlePage(1)
    // this.handleFirstPage()
    // this.handlePage(1)
    //this.handleFirst(null)

  }

  onSortSearch(event) {
    //console.log(this.blogs[0])
    this.sortOrder = !this.sortOrder
    if (this.sortOrder) {
      this.blogsPager.sort((x, y) => Date.parse(x.value.datemodified) - Date.parse(y.value.datemodified))
    } else {
      this.blogsPager.sort((x, y) => Date.parse(y.value.datemodified) - Date.parse(x.value.datemodified))
    }

  }
  ngOnDestroy() {
    console.log("Destroying: ViewBlog")
    this.subs.unsubscribe();
  }

  // 32 
  // < 1 2 > 
  // < 1 2 3>
  // < 1 2 3 4>
  // < 2 3 4 5>

  // < 1 2 3 4> 


  //   handlePage1(){
  //     let limit = this.blogs.length / this.pageSize
  //     if(limit != 1) {
  //       this.currentPage = 1
  //       if(this.blogs.length  - (this.currentPage * this.pageSize) > 0 ){
  //         this.blogsPager = this.blogs.slice((this.currentPage -1) * this.pageSize, this.currentPage * this.pageSize)
  //       }
  //       this.showPage2 = true;
  //     }
  // }

  isMoreItemsAvailable(arr,pageno){
    if ( (arr.length - (pageno * this.pageSize)) >= 0 || ((this.pageSize - (pageno * this.pageSize - arr.length)) ) > 0) {
      console.log(" length - totalpages:" + (arr.length - (pageno * this.pageSize)) )
      console.log((this.pageSize - (pageno * this.pageSize - arr.length) ))
      return true;
    } else {
      return false;
    }
  }

  handlePage(pagetogo) {
    console.log("page to go:" + pagetogo)
    let blogsLocal = []
    if(this.filtered){
      blogsLocal = this.blogsFiltered;
    } else {
      blogsLocal = this.blogs
    }

    if (pagetogo == 1) {
      this.showPage1 = false
      this.showPage2 = false
      this.page3 = pagetogo + 1;
      this.page4 = pagetogo + 2;
      // this.showPage3 = true
      // this.showPage4= true
    } else if (pagetogo == 2) {
      this.showPage1 = false

      this.showPage2 = true
      this.page2 = pagetogo - 1;

      if(this.isMoreItemsAvailable(blogsLocal,pagetogo + 1 )) {
        this.showPage3 = true
        this.page3 = pagetogo + 1;
      }
      if(this.isMoreItemsAvailable(blogsLocal,pagetogo + 2 )) {
        this.showPage4 = true
        this.page4 = pagetogo + 2;
      }

    } else {
      this.showPage1 = true
      this.showPage2 = true
   
      this.page1 = pagetogo - 2;
      this.page2 = pagetogo - 1;

      console.log(this.isMoreItemsAvailable(blogsLocal,pagetogo + 1 ))
      if(this.isMoreItemsAvailable(blogsLocal,pagetogo + 1 )) {
        this.showPage3 = true
        this.page3 = pagetogo + 1;
      } else {
        this.showPage3 = false
      }
      console.log(this.isMoreItemsAvailable(blogsLocal,pagetogo + 2 ))
      if(this.isMoreItemsAvailable(blogsLocal,pagetogo + 2 )) {
        this.showPage4 = true
        this.page4 = pagetogo + 2;
      } else {
        this.showPage4 = false
      }
    }

      //let limit = blogsLocal.length / this.pageSize
      this.currentPage = pagetogo
      if (blogsLocal.length - (this.currentPage * this.pageSize) >= 0) {
        this.blogsPager = blogsLocal.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
      } else {
        let index = (this.pageSize - (this.currentPage * this.pageSize - blogsLocal.length))
        this.blogsPager = blogsLocal.slice((this.currentPage - 1) * this.pageSize)
        this.showPage3 = false
        this.showPage4 = false
      }
   
  }


  handleNextV2() {
      let arr = []
      if(this.filtered)
          arr = this.blogsFiltered;
       else 
         arr = this.blogs
      
      if (arr.length - (this.currentPage * this.pageSize) > 0  ) {
        this.currentPage++
        this.handlePage(this.currentPage)
      } 
 
  }
  handlePrevV2() {
   
    if(this.currentPage > 1)  {
      this.currentPage--
      this.handlePage(this.currentPage)
    }
  }


}
