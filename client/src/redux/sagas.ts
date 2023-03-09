import type { AxiosPromise, AxiosResponse } from 'axios';
import axios from 'axios';
import type { CallEffect, ForkEffect, PutEffect } from 'redux-saga/effects';
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import type {
  AddPostAction,
  DeletePostAction,
  EditPostsAction,
  LoadSearchPostsAction,
} from './actionTypes';
import { setSearchPosts, editPost, add, deleteOnePost } from './postsSlice/postSlice';
import type { PostInputState, PostState } from './postsSlice/postTypes';
// import { registerUser, setUser } from './userSlice/userSlice';
// import Api from '...'

const axiosCallSearch = (input: string): AxiosPromise<PostState[]> =>
  axios.post<PostState[]>('/posts/search', { input });
// .catch((e) => (console.log(e), []));
const axiosCallAddPost = (input: PostInputState): AxiosPromise<PostState> =>
  axios.post('/posts', { input });
const axiosCallEdit = (edit: PostState): AxiosPromise<PostState> =>
  axios.patch(`/posts/edit/${edit.id}`, { ...edit });
const axiosCallDelete = (deleted: PostState['id']): AxiosPromise<PostState['id']> =>
  axios.delete(`/posts/${deleted}`);

// const axiosCallUserAuth = (user) => axios.get('/auth/check', user);
// const axiosCallUserReg = (register) => axios.post('/auth/register', register);

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchPosts(
  action: LoadSearchPostsAction,
): Generator<CallEffect | PutEffect, void, AxiosResponse<PostState[]>> {
  try {
    console.log('SEARCH===========>', action);
    yield delay(2000);
    const res = yield call(axiosCallSearch, action.payload);
    yield put(setSearchPosts(res.data));
  } catch (e) {
    yield put({ type: 'LOAD_SEARCH_POSTS_FAILED', message: (e as Error).message });
  }
}

function* fetchPostsEdit(
  action: EditPostsAction,
): Generator<CallEffect | PutEffect, void, AxiosResponse<PostState>> {
  try {
    console.log('EDIT===========>', action);
    const res = yield call(axiosCallEdit, action.payload);
    yield put(editPost(res.data));
  } catch (e) {
    yield put({ type: 'EDIT_POST_FAILED', message: (e as Error).message });
  }
}

function* fetchPostsAdd(
  action: AddPostAction,
): Generator<CallEffect | PutEffect, void, AxiosResponse<PostState>> {
  try {
    console.log('ADD===========>', action);
    const res = yield call(axiosCallAddPost, action.payload);
    yield put(add(res.data));
  } catch (error) {
    yield put({ type: 'ADD_POST_FAILED', message: (error as Error).message });
  }
}

function* fetchPostsDelete(
  action: DeletePostAction,
): Generator<CallEffect | PutEffect, void, AxiosResponse<PostState[]>> {
  try {
    console.log('DELETE===========>', action);
    yield call(axiosCallDelete, action.payload);
    yield put(deleteOnePost(action.payload));
  } catch (error) {
    yield put({ type: 'POST_DELETE_FAILED', message: (error as Error).message });
  }
}

// function* fetchCheckUser(
//   action,
// ): Generator<CallEffect | PutEffect, void, AxiosResponse<AnyAction>> {
//   try {
//     yield call(axiosCallUserAuth, action.payload);
//     yield put(setUser(action.payload, { status: 'logged' }));
//   } catch (error) {
//     yield put({ type: 'USER_FETCH_FAILED', message: (error as Error).message });
//   }
// }

// function* fetchRegisterUser(
//   action,
// ): Generator<CallEffect | PutEffect, void, AxiosResponse<AnyAction>> {
//   try {
//     const res = yield call(axiosCallUserReg, action.payload);
//     yield put(registerUser({ ...res.data, status: 'logged' }));
//   } catch (error) {
//     yield put({ type: 'USER_FETCH_FAILED', message: (error as Error).message });
//   }
// }

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export function* mySagaWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest('LOAD_SEARCH_POSTS', fetchPosts);
}

export function* postsWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest('POST_EDITED', fetchPostsEdit);
}

export function* addPostsWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest('POST_ADDED', fetchPostsAdd);
}

export function* deletePostsWatcher(): Generator<ForkEffect<never>, void, unknown> {
  yield takeLatest('POST_DELETED', fetchPostsDelete);
}

// export function* checkUserWatcher(): Generator<ForkEffect<never>, void, unknown> {
//   yield takeLatest('USER_CHECK', fetchCheckUser);
// }

// export function* registerUserWatcher(): Generator<ForkEffect<never>, void, unknown> {
//   yield takeLatest('USER_REGISTER', fetchRegisterUser);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* mySaga() {
//   yield takeLatest('USER_FETCH_REQUESTED', fetchUser);
// }
