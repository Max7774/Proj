import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: green[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#388e3c',
    },
  },
});

export default function NavBar(): JSX.Element {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch({
      type: 'USER_CHECK',
      payload: user.status,
    });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {user.status === 'logged' ? (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {`Posts of: ${user.name}`}
              </Typography>
            ) : (
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Posts
              </Typography>
            )}
            <Button variant="text">
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/chat">
                Chat
              </Link>
            </Button>
            <Button variant="text">
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
                Main Page
              </Link>
            </Button>
            <Button variant="text">
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/posts/search">
                Search
              </Link>
            </Button>
            <Button variant="text">
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/auth/login">
                Login
              </Link>
            </Button>
            <Button variant="text">
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/auth/register">
                Register
              </Link>
            </Button>
            <Button variant="text">
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/auth/logout">
                Logout
              </Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
