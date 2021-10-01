import React from 'react';
import {useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Alert from '@material-ui/lab/Alert';
import { signup } from '../services/ApiService';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const history= useHistory();

  const[alert, setAlert]=React.useState(false);
  const[loading, setLoading]=React.useState(false);
  const[alertMessage, setAlertMessage]=React.useState('');
  const[severity, setSeverity]=React.useState('');


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        { loading && alert && <Alert severity={severity}>{alertMessage}</Alert>}
          <Formik
            initialValues={{
            
              username:'',
            password: '',
            confirmPassword:''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('User Name is required'),
              password: Yup.string().max(255).required('Password is required'),
              confirmPassword:Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
            })}
            asnyc onSubmit={async values => {
              
              await signup(values).then(data=>{
                setSeverity('success');
                setAlert(true);
                setAlertMessage("Sucess fully Registred");
                
                  history.push('/signin');
              }).catch(function (error){
                if (error.response.status===401) {
                  setAlert(true);
                  setAlertMessage("User name already exists ");
                  setSeverity('warning');
                }
                else{
                  setAlert(true);
                  setAlertMessage("Some thing went wrong ");
                  setSeverity('error');
                }
                
              }
                
                
               )
               setLoading(true)
          }}
          >
        {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
        }) => (
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
               error={Boolean(touched.username && errors.username)}
               helperText={touched.username && errors.username}
                variant="outlined"
                
                fullWidth
                id="email"
                label="User Name"
                name="username"
                value={values.username}
                onChange={handleChange}
                
                // autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               error={Boolean(touched.password && errors.password)}
               helperText={touched.password && errors.password}
                variant="outlined"
                
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange}
                value={values.password}
                autoComplete="current-password"
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               error={Boolean(touched.confirmPassword && errors.confirmPassword)}
               helperText={touched.confirmPassword && errors.confirmPassword}
                variant="outlined"
                
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                onChange={handleChange}
                
                value={values.confirmPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>)}
        </Formik>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}