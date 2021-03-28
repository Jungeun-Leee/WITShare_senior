import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';


import useStyles from './styles';
import {createPost, updatePost} from '../../actions/posts';


const Form =({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({item: '', tags: '' ,price: '', selectedFile: ''});
  const post = useSelector((state)=> (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({item: '', tags: '', price: '', selectedFile: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(currentId === 0) {
      dispatch(createPost( { ...postData, name: user?.result ?.name}));
      clear();
    } else{
        dispatch(updatePost(currentId,{ ...postData, name: user?.result ?.name}));
        clear();
    }
  };
if(!user?.result?.name){
  return(
    <Paper className={classes.paper}>
      <Typography variant="h6" align="center">
        Sign In first.
      </Typography>
    </Paper>

  );
}

  return(

    <Paper className ={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant="h6">{currentId ? 'Editing' : 'Posting Items'}</Typography>
      <TextField name="Item_name" variant="outlined" label="Item_name" fullWidth value={postData.item} onChange={(e) => setPostData({...postData, item: e.target.value})} />
      <TextField name="price" variant="outlined" label="price" fullWidth value={postData.price} onChange={(e) => setPostData({...postData, price: e.target.value})} />
      <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} />
      <div className={classes.fileInput}>
        <FileBase
          type="file"
          multiple={false}
          onDone={({base64}) =>setPostData({...postData, selectedFile: base64})} />
      </div>
        <Button className={classes.buttonSubmit} variant ="container" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant ="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
}

export default Form;
