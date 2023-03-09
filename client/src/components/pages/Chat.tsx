import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

type Meow = {
  str: string;
};

export default function Chat(): JSX.Element {
  const [input, setInput] = useState('');
  const [visibile, setVisibile] = useState(false);
  const arr = [];
  function meow(): [] | undefined {
    const res = Math.floor(Math.random() * (10 - 3)) + 3;
    const newArr = ['Мяу'];
    for (let i = 0; i < res; i += 1) {
      newArr.push('мяу');
    }
    arr.push(newArr);
    console.log(arr);
    return arr;
  }
  const [cats, setCats] = useState(arr);
  const [meows, setMeows] = useState(cats);
  console.log('====', cats);

  return (
    <div>
      <TextField fullWidth label={input} id="fullWidth" />
      <Button
        variant="contained"
        disableElevation
        onClick={() => {
          // meows.push(cats);
          setCats(meow);
          setVisibile(true);
        }}
      >
        Send
      </Button>
      {visibile
        ? cats.map((el) => (
            <TextField fullWidth label={`${el?.map((cat) => cat).join(' ')}!`} id="fullWidth" />
          ))
        : null}
    </div>
  );
}
