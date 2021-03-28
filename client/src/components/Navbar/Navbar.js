import React, {useState, useEffect} from 'react';
import { AppBar, Typography, Avatar, Toolbar, Button} from '@material-ui/core';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import wit from '../../images/wit.png';
import useStyles from './styles';
import decode from 'jwt-decode';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  console.log(user);

  const logout = () => {
    dispatch({ type: 'LOGOUT'});

    history.push('/');
    setUser(null);
  }

  useEffect(() => {
    const token = user?.token;
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);
  return (
    <AppBar className={classes.appBar} position ="static" color="inherit">
      <div className ={classes.brandContainer}>
        <Typography component = {Link} to= "/" className={classes.heading} variant = "h2" align="center">WITShare</Typography>
        <img className={classes.image} src={wit} alt="icon" height="100" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary">Logout</Button>
          </div>
        ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
