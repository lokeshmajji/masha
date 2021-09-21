import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Editor, Toolbar } from 'ngx-editor';
import { DataService } from 'src/app/dao/data.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-edit-blog-new',
  templateUrl: './edit-blog-new.component.html',
  styleUrls: ['./edit-blog-new.component.css']
})
export class EditBlogNewComponent implements OnInit , OnDestroy{

  @Input() blogId;
  blogtext
  heading
  category
  tags
  @ViewChild('blogForm') blogForm;
  loading : boolean
  
  editor: Editor; //https://github.com/sibiraj-s/ngx-editor#demo
  toolbar: Toolbar = [
    ["bold", "italic"],
    ["underline", "strike"],
    ["code", "blockquote"],
    ["ordered_list", "bullet_list"],
    [{ heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
    ["link", "image"],
    ["text_color", "background_color"],
    ["align_left", "align_center", "align_right", "align_justify"]
  ];
  

  constructor(private route: ActivatedRoute, private service: DataService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.editor = new Editor();

    this.route.queryParams.subscribe(params => {
      this.blogId = params.blogId
      this.service.getBlog(this.blogId).subscribe( (data: any) => {
        this.blogtext = data.blogtext
        this.heading = data.heading
        this.category = data.category
        this.tags = data.tags
      })
     })
  }

  onSubmit(form: NgForm){
    console.log(form.value);
    this.loading = true;
    this.service.updateBlog( this.blogId,
      {
        heading : form.value.heading,
        blogtext: form.value.blogtext,
        category : form.value.category,
        tags: form.value.tags,
        datecreated : new Date(),
        datemodified: new Date(),
        comments : [new Comment()]
      }
    ).subscribe( res => {
      console.log(res)
      this.loading = false
      this.sharedService.blogAddedSubject.next(true);
      this.sharedService.openSnackBar("Blog Updated successfully","Yay")
      form.reset()
    }, err => {
      console.log(err)
      this.loading = false
      this.sharedService.openSnackBar("Blog Update failed","Naa")
    });

  }

  clearForm(){
      this.blogForm.clear();
  }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

}
