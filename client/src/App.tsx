import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import { CircularProgress } from '@mui/material';
import NavBar from './components/ui/NavBar';
import MainPage from './components/pages/MainPage';
import SearchPage from './components/pages/SearchPage';
import LoginPage from './components/pages/LoginPage';
import Register from './components/pages/Register';
import Chat from './components/pages/Chat';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import PrivateRoute from './components/HOC/PrivateRoute';
// import { checkAuth } from './redux/userSlice/userSlice';

function App(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({
      type: 'USER_CHECK',
      payload: user.status,
    });
  }, []);
  // console.log('====', user);

  return (
    <Container maxWidth="xl">
      {/* {user.status === 'empty' ? (
        <CircularProgress />
      ) : ( */}
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/chat" element={<Chat />} />
          <Route
            element={
              <PrivateRoute isAllowed={user.status === 'logged'} redirectPath="/posts">
                <LoginPage />
              </PrivateRoute>
            }
            path="/auth/login"
          />
          <Route
            element={
              <PrivateRoute isAllowed={user.status === 'logged'} redirectPath="/posts">
                <Register />
              </PrivateRoute>
            }
            path="/auth/register"
          />
          <Route
            element={<PrivateRoute isAllowed={user.status === 'logged'} redirectPath="/login" />}
          />
          <Route path="/posts/search" element={<SearchPage />} />
        </Routes>
      </>
      {/* )} */}
    </Container>
  );
}

export default App;
