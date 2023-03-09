import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useAppDispatch } from '../../redux/hooks';
// import { add } from '../../redux/postsSlice/postSlice';
import type { PostInputState } from '../../redux/postsSlice/postTypes';

export default function Form(): JSX.Element {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState<PostInputState>({ title: '', body: '' });
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <form>
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={7}>
        <h1>Write your own post</h1>
        <TextField
          id="titleId"
          onChange={changeHandler}
          value={input.title}
          name="title"
          type="text"
          label="Title"
          variant="standard"
        />
        <TextField
          id="bodyId"
          onChange={changeHandler}
          value={input.body}
          name="body"
          type="text"
          label="Body"
          multiline
          rows={4}
        />
        <Button
          variant="contained"
          type="submit"
          disableElevation
          onClick={(e) => {
            e.preventDefault();
            dispatch({
              type: 'POST_ADDED',
              payload: input,
            });
          }}
        >
          Add Post
        </Button>
      </Stack>
    </form>
  );
}
