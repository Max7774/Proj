import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import type { RegisterUser } from '../../redux/userSlice/userTypes';
// import Avatar from '@mui/material/Avatar';
// import CssBaseline from '@mui/material/CssBaseline';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';

// function Copyright(props: any): JSX.Element {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}.
//     </Typography>
//   );
// }

// const theme = createTheme();

export default function Register(): JSX.Element {
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = (): void => setShowPassword((show) => !show);

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
  };
  const [formInput, setFormInput] = useState<RegisterUser>({
    email: '',
    name: '',
    password: '',
  });
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({
          type: 'USER_REGISTER',
          payload: formInput,
        });
        navigate('/');
      }}
    >
      <Stack direction="column" justifyContent="center" alignItems="center" spacing={4}>
        <h1>Registration form</h1>
        <TextField
          id="outlined-basic"
          value={formInput.email}
          onChange={changeHandler}
          name="email"
          type="text"
          label="Email"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={formInput.name}
          onChange={changeHandler}
          name="name"
          type="text"
          label="Username"
          variant="outlined"
        />
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            name="password"
            label="Password"
            value={formInput.password}
            onChange={changeHandler}
          />
        </FormControl>
        <Button variant="contained" type="submit" disableElevation>
          Register
        </Button>
      </Stack>
    </form>
    // <ThemeProvider theme={theme}>
    //   <Container component="main" maxWidth="xs">
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 8,
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    //         <LockOutlinedIcon />
    //       </Avatar>
    //       <Typography component="h1" variant="h5">
    //         Registration
    //       </Typography>
    //       <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
    //         <Grid container spacing={2}>
    //           <Grid item xs={12} sm={6}>
    //             <TextField
    //               autoComplete="given-name"
    //               name="firstName"
    //               required
    //               fullWidth
    //               id="firstName"
    //               label="First Name"
    //               autoFocus
    //             />
    //           </Grid>
    //           <Grid item xs={12} sm={6}>
    //             <TextField
    //               required
    //               fullWidth
    //               id="lastName"
    //               label="Last Name"
    //               name="lastName"
    //               autoComplete="family-name"
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               id="email"
    //               label="Email Address"
    //               name="email"
    //               autoComplete="email"
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <TextField
    //               required
    //               fullWidth
    //               name="password"
    //               label="Password"
    //               type="password"
    //               id="password"
    //               autoComplete="new-password"
    //             />
    //           </Grid>
    //           <Grid item xs={12}>
    //             <FormControlLabel
    //               control={<Checkbox value="allowExtraEmails" color="primary" />}
    //               label="I want to receive inspiration, marketing promotions and updates via email."
    //             />
    //           </Grid>
    //         </Grid>
    //         <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
    //           Sign Up
    //         </Button>
    //         <Grid container justifyContent="flex-end">
    //           <Grid item>
    //             <Link href="/" variant="body2">
    //               {' '}
    //               Already have an account? Sign in
    //             </Link>
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     </Box>
    //     <Copyright sx={{ mt: 5 }} />
    //   </Container>
    // </ThemeProvider>
  );
}
