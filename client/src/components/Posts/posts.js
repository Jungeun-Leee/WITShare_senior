import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import {useSelector} from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';


const Posts =() => {
  const posts = useSelector((state)=> state.posts);
  const classes =useStyles();

  console.log(posts);

  return(
    <>
      //<h1 className={classes.something}>Posts</h1>
      <h1>Posts</h1>
      <Post />
      <Post />
    </>
  );
}

export default Posts;
