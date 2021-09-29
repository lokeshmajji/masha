import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { DataService } from 'src/app/dao/data.service';
import { SharedService } from 'src/app/shared/shared.service';
// import * as Editor from '../../../../ckeditor5/build/ckeditor';
// import * as Editor from '../../../../ckeditor/ckeditor';

@Component({
  selector: 'app-view-blog-new',
  templateUrl: './view-blog-new.component.html',
  styleUrls: ['./view-blog-new.component.css']
})
export class ViewBlogNewComponent implements OnInit {

  // public editor = Editor;
  @Input() blogId;
  blogtext
  heading : string = ''
  category : string = ''
  tags : string = ''
  @ViewChild('blogForm') blogForm;
  loading: boolean
  editorConfig = {
    height: '550px',
    uiColor: '#F7B42C',

    codeSnippet_theme: 'xcode',
    toolbarCanCollapse :true,

    toolbar:[
   
      { name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize'] },
      { name: 'codeSnippet', items: [ 'codeSnippet' ] },
    ]
  }
  
  template =`<pre>
  <code class="language-javascript">  onSubmit(form: NgForm){
      if (form.value.heading.trim() == ''|| form.value.category.trim() == ''|| form.value.tags.trim() == '') {
        this.sharedService.openSnackBar("Please enter mandatory fields", "oops")
        return;
      }</code></pre>
  
  <p>&nbsp;</p>`
  
  ckeditorConfig = {
    toolbar: {
      items: [
        'Heading',

        'bold',
        'italic',
        'underline',
        'Link',
        'bulletedList',
        'numberedList',
        '|',
        'indent',
        'outdent',
        'Alignment',
        '|',
        'ImageUpload',
        'BlockQuote',
        'InsertTable',
        'undo',
        'redo',
        '|',
        'Code',
        'codeBlock',
        '|',
        'FontBackgroundColor',
        'FontColor',
        'FontFamily',
        'FontSize',
        'Highlight',
        'HorizantalLine',
        'HtmlEmbed',
        'ImageInsert',
        'SpecialCharacters',



      ]
    },
    image: {
      toolbar: [
        'imageStyle:full',
        'imageStyle:side',
        '|',
        'imageTextAlternative'
      ]
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells'
      ]
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en'
  };
  

  constructor(private route: ActivatedRoute, private service: DataService, private sharedService: SharedService) { }

  ngOnInit(): void {

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

  onEditorReady() {
    
  }
  showCode() {
    console.log(this.template)
  }

}
