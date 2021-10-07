import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Blog } from 'src/app/model/blog.model';
import { addBlog } from '../store/action/blog.actions';
import { BlogState } from '../store/reducer/blog.reducer';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {

  constructor(private store: Store<BlogState>) { }

  ngOnInit(): void {
  }

  addBlog(blogHeading: string): void {
    const blog = new Blog(blogHeading, 'content ', new Date(), new Date(), ["tags"], "Test", [])
    this.store.dispatch(addBlog(blog))
  }

}
