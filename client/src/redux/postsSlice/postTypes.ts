export type SearchPost = {
  searchPosts: PostState[];
};

export type PostInputState = {
  title: string;
  body: string;
};

export type PostIdState = {
  id: number;
};
export type PostState = {
  id: number;
  title: string;
  body: string;
};

// export type SearchPost = {
//   searchPost: [];
// }

// export type PostAdd = {
//   title: string;
//   body: string;
// };

// export type PostId = {
//   id: number;
// };

// export type PostSliceType = { posts: PostState[] };

// export type PostAction =
//   | { type: 'RESET_POSTS' }
//   | { type: 'ALL_POSTS'; payload: PostState[] }
//   | {
//       type: 'ADD_POST';
//       payload: PostState;
//     }
//   | { type: 'DELETE_POST'; payload: number };
