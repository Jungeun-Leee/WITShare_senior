import React, {useState ,useEffect} from 'react';
import {Container, AppBar, Typography, Grow, Grid} from '@material-ui/core';
import {useDispatch} from 'react-redux';
import wit from './images/wit.png';
import {getPosts} from './actions/posts';
import Posts from './components/Posts/posts';
import Form from './components/Form/form';
import useStyles from './styles';

const App = () => {
  const classes =useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return(
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position ="static" color="inherit">
        <img className={classes.image} src={wit} alt="wit" height="100" />
        <Typography className={classes.heading} variant = "h2" align="center">WITShare</Typography>

      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={7}>
              <Posts />
          </Grid>
          <Grid item xs={12} sm={4}>
              <Form />
          </Grid>
        </Grid>
        </Container>
      </Grow>
    </Container>
  );
}

export default App;
