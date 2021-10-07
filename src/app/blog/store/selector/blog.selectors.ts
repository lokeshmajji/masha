import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromBlog from '../reducer/blog.reducer'
export const selectBlogState = createFeatureSelector<fromBlog.BlogState>(
    fromBlog.blogFeatureKey
);

export const selectBlogs = createSelector(
    selectBlogState,
    (state: fromBlog.BlogState) => state.blogs
)
