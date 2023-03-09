// import axios from 'axios';
// import { createSlice } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { PostInputState, PostState } from './postTypes';
import type { AppThunk } from '../hooks';
// import type { AppThunk } from '../hooks';

const initialState: PostState[] = [];

console.log('lolololoolo');

// export default function postsReducer(
//   state: PostSliceType = initialState,
//   action: PostAction,
// ): PostSliceType {
//   switch (action.type) {
//     case 'RESET_POSTS':
//       return { posts: [] };
//     case 'ALL_POSTS':
//       return { posts: action.payload };
//     case 'ADD_POST':
//       return { posts: [...state.posts, action.payload] };
//     case 'DELETE_POST':
//       return { posts: state.posts.filter((el) => el.id !== action.payload) };
//     default:
//       return state;
//   }
// }

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    allPosts: (state, action: PayloadAction<PostState[]>) => action.payload,
    add: (state, action: PayloadAction<PostState>) => [action.payload, ...state],
    deleteOnePost: (state, action: PayloadAction<PostState['id']>) =>
      state.filter((el) => el.id !== action.payload),
    editPost: (state, action: PayloadAction<PostState>) => [...state, action.payload],
    setSearchPosts: (state, action: PayloadAction<PostState[]>) => action.payload,
  },
});

// export const allPosts = (): AppThunk => (dispatch) => {
//   axios<PostState[]>('/posts')
//     .then((res: { data: PostState[] }) => dispatch({ type: 'ALL_POSTS', payload: res.data }))
//     .catch((error) => {
//       console.log(error);
//     });
// };
export const { allPosts, add, deleteOnePost, editPost, setSearchPosts } = postSlice.actions;

// export const addPost =
//   (reqbody: PostInputState): AppThunk =>
//   (dispatch) => {
//     axios
//       .post<PostState>('/posts', reqbody)
//       .then((res) => dispatch(add(res.data)))
//       .catch(console.log);
//   };

// export const deletePost =
//   (id: number): AppThunk =>
//   (dispatch) => {
//     axios
//       .delete(`/posts/${id}`)
//       .then(() => dispatch(deleteOnePost(id)))
//       .catch(console.log);
//   };

export const editPosts =
  (id: number, input: PostState['body'], input2: PostState['title']): AppThunk =>
  (dispatch) => {
    axios
      .patch<PostState>(`/posts/${id}`, { body: input, title: input2 })
      .then((res) => dispatch(editPost(res.data)))
      .catch(console.log);
  };

// export const loadSearchPosts =
//   (input: string): AppThunk =>
//   (dispatch) => {
//     axios
//       .post<PostState[]>('/posts/search', { input })
//       .then((res) => dispatch(setSearchPosts(res.data)))
//       .catch(console.log);
//   };

export default postSlice.reducer;
