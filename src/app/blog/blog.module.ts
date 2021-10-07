import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { BlogAddComponent } from './blog-add/blog-add.component';
import { StoreModule } from '@ngrx/store';

import { blogFeatureKey, reducer } from './store/reducer/blog.reducer';

@NgModule({
  declarations: [
    BlogViewComponent,
    BlogAddComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(blogFeatureKey, reducer),
  ],
  exports: [
    BlogViewComponent,
    BlogAddComponent
  ]
})
export class BlogModule { }
