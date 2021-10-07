import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/model/blog.model';
import { BlogState } from '../store/reducer/blog.reducer';
import { selectBlogs } from '../store/selector/blog.selectors';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  blogs$ : Observable<Blog[]>
  constructor(private store: Store<BlogState>) {
    this.blogs$ = this.store.pipe(select(selectBlogs))
  }

  ngOnInit(): void {
  }

}
