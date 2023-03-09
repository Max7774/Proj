/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AppThunk } from '../hooks';
import type { RootState } from '../store';
import type { FormUser, RegisterUser } from './userTypes';

type BackendUser = {
  id: number;
  name: string;
};

// Define a type for the slice state
type UserState =
  | { status: 'fetching' }
  | {
      id: number;
      name: string;
      status: 'logged';
    }
  | {
      id: number;
      email: string;
      name: string;
      secondName: string;
      password: string;
      status: 'registered';
    }
  | { status: 'empty' };

// Define the initial state using that type
const initialState: UserState = {
  status: 'fetching',
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState: initialState as UserState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => action.payload,
    // registerUser: (state, action: PayloadAction<UserState>) =>
    //   // action.payload,
    //   ({
    //     name: action.payload,
    //     email: action.payload,
    //     password: action.payload,
    //     status: 'logged',
    //   }),
    logoutUser: (state) => ({ status: 'empty' }),
  },
});

export const { setUser, logoutUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectUser = (state: RootState): UserState => state.user;

// export const loginHandler =
//   (formInput: FormUser): AppThunk =>
//   (dispatch) => {
//     axios
//       .post<BackendUser>('/auth/login', formInput)
//       .then((res) => dispatch(setUser({ ...res.data, status: 'logged' })))
//       .catch((err) => {
//         console.log(err);
//         dispatch(setUser({ status: 'empty' }));
//       });
//   };

// export const logoutHandler = (): AppThunk => (dispatch) => {
//   axios('/auth/logout')
//     .then(() => dispatch(logoutUser()))
//     .catch(console.log);
// };

// export const checkAuth = (): AppThunk => (dispatch) => {
//   axios<BackendUser>('/auth/check')
//     .then((res) => dispatch(setUser({ ...res.data, status: 'logged' })))
//     .catch(() => {
//       dispatch(setUser({ status: 'empty' }));
//     });
// };

export default userSlice.reducer;
