import React, { useCallback, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { Input, InputAdornment, InputLabel } from '@mui/material';
import ListPosts from '../ui/ListPosts';
import { useAppDispatch } from '../../redux/hooks';
// import { setSearchPosts } from '../../redux/postsSlice/postSlice';
// import type { PostState } from '../../redux/postsSlice/postTypes';

export default function SearchPage(): JSX.Element {
  // const searchPosts = useAppSelector((store) => store.posts.searchPosts);
  const dispatch = useAppDispatch();
  const [input, setInput] = useState('');
  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => setInput(e.target.value),
    [],
  );
  useEffect(() => {
    dispatch(
      { type: 'LOAD_SEARCH_POSTS', payload: input },
      // setSearchPosts(input),
    );
  }, [input]);
  return (
    <div>
      <FormControl fullWidth sx={{ m: 1 }} variant="standard">
        <InputLabel htmlFor="standard-adornment-amount">Search</InputLabel>
        <Input
          id="standard-adornment-amount"
          value={input}
          onChange={changeHandler}
          startAdornment={<InputAdornment position="start">Write</InputAdornment>}
        />
      </FormControl>
      <ListPosts />
    </div>
  );
}
