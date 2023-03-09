import type { AllEffect, ForkEffect } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import {
  // checkUserWatcher,
  deletePostsWatcher,
  addPostsWatcher,
  mySagaWatcher,
  postsWatcher,
  // registerUserWatcher,
} from './sagas';

export default function* rootSaga(): Generator<
  AllEffect<Generator<ForkEffect<never>, void, unknown>>,
  void,
  unknown
> {
  yield all([
    mySagaWatcher(),
    addPostsWatcher(),
    postsWatcher(),
    deletePostsWatcher(),
    // registerUserWatcher(),
    // checkUserWatcher(),
  ]);
}
