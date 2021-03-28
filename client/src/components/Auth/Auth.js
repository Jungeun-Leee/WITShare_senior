import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
//import {AUTH} from '../../constants/actionsTypes';
import {signin, signup} from '../../actions/auth';

const initialState = {fistName: '', lastName: '', email: '', password: ''};


const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
//  const isSignup = true;
  const dispatch = useDispatch();
  const history =useHistory();
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
      dispatch(signup(formData, history));
    } else{
      dispatch(signin(formData, history));
    }

  //  console.log(formData);
  };
  const handleChange = (e) => {
    setFormData({ ... formData, [e.target.name]: e.target.value});
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup)=> !prevIsSignup);
    setShowPassword(false);
  };
  return(
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
                <>
                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                </>
              )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup ? 'Already have an account? Sign In' : " Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
