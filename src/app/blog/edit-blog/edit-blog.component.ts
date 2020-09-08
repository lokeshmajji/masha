import { Component, OnInit, AfterViewChecked, OnDestroy, ViewChild } from '@angular/core';
import { DataService } from 'src/app/dao/data.service';
import { NgForm } from '@angular/forms';
import { Editor } from 'primeng/editor/editor';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit, AfterViewChecked, OnDestroy {

  blogtext : string = "<ul><li>1</li><li>2</li></ul>";
  heading : string = "default heading";
  tags : string[] = [];
  category : string = ""
  key : string;

  @ViewChild('peditor') peditor; 
  @ViewChild('qeditor') qeditor; 
 public modules = {
    toolbar: [      
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ]
  };


  constructor(private dataservice : DataService) { }

  ngOnInit() {
   console.log("EditBlog->NgOnInit->" + this.heading);
   this.dataservice.blogSubject.subscribe( item => {
                console.log("Received:--------"+ new Date())
                console.log( item.value.blogtext);
                this.blogtext = item.value.blogtext;
                this.heading = item.value.heading;
                this.tags = item.value.tags;
                this.category = item.value.category;
                this.key = item.key
                //setTimeout(this.handleRefresh,2000);
          });

  }
  handleRefresh(event){
    console.log("called refresh" + this.blogtext)
    Array
    .from(this.peditor.el.nativeElement.children)
   // .filter( (c: HTMLElement) => c.className.includes('ql-blank'))
    .forEach( (c :HTMLElement) =>  {
      console.log(c.children[1].children[0])
      if(this.blogtext) {
        console.log("Why the text is null " + this.blogtext)

        c.children[1].children[0].innerHTML = this.blogtext;
      }
     }
      );
  }
  ngAfterViewInit() {
   
      //console.log("After view checked");
    //console.log(this.heading)
  //   Array
  //   .from(this.peditor.el.nativeElement.children)
  //  // .filter( (c: HTMLElement) => c.className.includes('ql-blank'))
  //   .forEach( (c :HTMLElement) =>  {
  //     console.log(c.children[1].children[0])
  //     if(this.blogtext) {
  //       console.log("Why the text is null " + this.blogtext)

  //       c.children[1].children[0].innerHTML = this.blogtext;
  //     }
  //    //c.children[1].children[0].innerHTML = '<p> A paragraph </p> <ul><li>1</li><li>2</li></ul>';
  //    //c.children[1].children[0].innerHTML =  '<ol><li><strong>First Description</strong></li><li><strong>Second Description </strong></li><li><strong>Third description</strong></li></ol>'

  //    }
  //     );
 //setTimeout(this.handleRefresh,2000);

    //var x = this.peditor.el.nativeElement.children
    //x.querySelector(".ql-editor").innerHTML = this.blogtext
   //  console.log(this.peditor.el.nativeElement.children)
    //var result = document.getElementsByClassName("ql-editor")[0].innerHTML = '<p> A paragraph </p>';
    //console.log(result)
   
  }

  ngAfterViewChecked(){
    //setTimeout(this.handleRefresh,2000);
  }

  ngOnDestroy()	{
    console.log("Destroying:" + this.heading)
  }

  onSubmit(form : NgForm){
    console.log(form)
    this.dataservice.updateBlog(this.key, {
      heading : form.value.heading,
      blogtext: form.value.blogtext,
      category : form.value.category,
      tags: form.value.tags,
      datecreated : new Date(),
      datemodified: new Date(),
      comments : [new Comment()]
    }).subscribe( res => {
       console.log(res)
    }, err => {
      console.log(err)
    })
  }
  logChange($event) {
    
    console.log($event);
  }


}
