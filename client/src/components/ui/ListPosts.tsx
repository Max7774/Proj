/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import OnePost from './OnePost';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { allPosts } from '../../redux/postsSlice/postSlice';
import type { PostState } from '../../redux/postsSlice/postTypes';

function ListPosts(): JSX.Element {
  console.log('render');
  const dispatch = useAppDispatch();
  const posts = useAppSelector((store) => store.posts);
  useEffect(() => {
    axios<PostState[]>('/posts')
      .then((res) => dispatch(allPosts(res.data)))
      .catch(console.log);
  }, []);
  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <OnePost key={post.id} post={post} />
      ))}
    </Grid>
  );
}

export default memo(ListPosts);
