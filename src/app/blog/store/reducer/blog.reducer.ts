import { Action, createReducer, on, State } from '@ngrx/store';
import { Blog } from 'src/app/model/blog.model';
import * as BlogActions from '../action/blog.actions'

export const blogFeatureKey = 'blog';

export interface BlogState  {
    blogs : Blog[]
}

export const initialState: BlogState = {
      blogs: []
};


export const customReducer = createReducer(
  initialState,
  on(BlogActions.addBlog, (state: BlogState, { blog }) => ({
    ...state,
    blogs: [...state.blogs, blog]
  }))

);

export function reducer(state: BlogState | undefined, action: Action): any {
  return customReducer(state, action)
}

