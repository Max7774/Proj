import type { PostInputState, PostState } from './postsSlice/postTypes';

export type LoadSearchPostsAction = {
  type: 'LOAD_SEARCH_POSTS';
  payload: string;
};

export type EditPostsAction = {
  type: 'POST_EDITED';
  payload: PostState;
};

export type AddPostAction = {
  type: 'POST_ADDED';
  payload: PostInputState;
};

export type DeletePostAction = {
  type: 'POST_DELETED';
  payload: PostState['id'];
};
