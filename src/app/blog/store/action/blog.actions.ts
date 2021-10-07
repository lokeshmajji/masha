import { createAction, props } from '@ngrx/store';
import { Blog } from 'src/app/model/blog.model';

export const addBlog = createAction(
  '[Blog] Add Blog',
  (blog:Blog) => ({blog})
);




