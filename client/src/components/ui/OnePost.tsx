import React, { useCallback, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormGroup from '@mui/material/FormGroup';
import { TextField } from '@mui/material';
import type { PostState } from '../../redux/postsSlice/postTypes';
import { useAppDispatch } from '../../redux/hooks';
// import { deleteOnePost } from '../../redux/postsSlice/postSlice';

type OnePostProps = {
  post: PostState;
};

export default function OnePost({ post }: OnePostProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [click, setClick] = useState(false);
  const [input, setInput] = useState(post.body);
  const [input2, setInput2] = useState(post.title);
  const changeHandler = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInput(e.target.value);
  }, []);
  const changeHandler2 = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInput2(e.target.value);
  }, []);
  const stopEditHandler = useCallback(() => {
    setClick(!click);
    setInput(post.body);
    setInput2(post.title);
  }, []);
  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          {!click ? (
            <Typography gutterBottom variant="h5" component="div">
              {input2}
            </Typography>
          ) : (
            <TextField
              id="bodyId"
              name="body"
              type="text"
              value={input2}
              onChange={changeHandler2}
              label="Title"
              multiline
              rows={4}
            />
          )}
          {!click ? (
            <Typography variant="body2" color="text.secondary">
              {input}
            </Typography>
          ) : (
            <TextField
              id="bodyId"
              name="body"
              type="text"
              value={input}
              onChange={changeHandler}
              label="Body"
              multiline
              rows={4}
            />
          )}
          <FormGroup />
        </CardContent>
        <CardActions>
          {!click ? (
            <Button
              type="button"
              onClick={() =>
                dispatch({
                  type: 'POST_DELETED',
                  payload: post.id,
                })
              }
              size="small"
              variant="outlined"
            >
              Delete
            </Button>
          ) : (
            <Button type="submit" onClick={() => stopEditHandler()} size="small" variant="outlined">
              Undo
            </Button>
          )}
          <Button
            type="button"
            onClick={() => {
              if (click) {
                dispatch({
                  type: 'POST_EDITED',
                  payload: { id: post.id, body: input, title: input2 },
                });
              }
              setClick(!click);
            }}
            size="small"
            variant="outlined"
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
