import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";



const userValidationSchema = yup.object({
  username: yup.string()
    .required("username is mandatory"),
  password: yup.string()
    .required("password must be atleast 8 characters . there should be atleast one capital letter,specialcase and number")
});

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const theme = createTheme();

export default function SignUp() {

  const navigate = useNavigate();

  const [user, setUser] = useState({})
  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: userValidationSchema,
    onSubmit: (newUser) => {
      createUser(newUser)
    }
  });

  const createUser = (newUser) => {
    fetch("https://show-backend-4fzv-git-master-deepavishali.vercel.app/user/signup", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    })
    .then((res)=>{
      if(res.status===400){
        alert("Password must have atleast 8 characters [Atleast one capital letter,numbers and special cases mandatory]")
      }
      else{
        alert("SignUp successfull,Click ok!")
        localStorage.setItem("authenticated",true);
        navigate("/movieboard");
       }
    })
      .then((data) => data.json())
      .then((data) => console.log(data)).catch((err) => console.log(err))
      
    console.log(newUser);
    setUser({ ...user, ...newUser });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     username: data.get('username'),
  //     password: data.get('password'),
  //   });
  // };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              id="username"
              name="username"
              label="username"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              style={{ width: '500px' }}
            />
            <br />

            {formik.touched.username && formik.errors.username ? formik.errors.username : ""}
            <br />
            <TextField
              id="password"
              name="password"
              label="password"
              variant="outlined"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              style={{ width: '500px' }}
            />
            {formik.touched.password && formik.errors.password ? formik.errors.password : ""}
            <br />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={()=>navigate('/client')}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
              </Grid>
              {/* <Grid item>
                <Link href="#" variant="body2" onClick={()=>navigate("/signup")}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}