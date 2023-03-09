import React from 'react';
import Form from '../ui/Form';
import ListPosts from '../ui/ListPosts';

export default function MainPage(): JSX.Element {
  return (
    <div>
      <Form />
      <ListPosts />
    </div>
  );
}
