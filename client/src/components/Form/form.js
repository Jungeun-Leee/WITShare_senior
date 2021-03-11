import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBaes from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import FileBase from 'react-file-base64';

import useStyles from './styles';
import {createPost} from '../../actions/posts';


const Form =() => {
  const [postData, setPostData] = useState({
    creator: '', Item_name:'', message:'', price:'', photo:''
  })
  const classes =useStyles();
  const dispatch =useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(createPost(postData));
    clear();
  }

  const clear = () =>{

  }

  return(
    <Paper className ={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
      <Typography variant="h6">Posting Items</Typography>
      <TextField
      name="creator"
      variant="outlined"
      label="Creator"
      fullWidth
      value={postData.creator}
      onChange={(e) => setPostData({...postData, creator: e.target.value})}
      />

      <TextField
      name="Item_name"
      variant="outlined"
      label="Item_name"
      fullWidth
      value={postData.Item_name}
      onChange={(e) => setPostData({...postData, Item_name: e.target.value})}
      />

      <TextField
      name="message"
      variant="outlined"
      label="message"
      fullWidth
      value={postData.message}
      onChange={(e) => setPostData({...postData, message: e.target.value})}
      />

      <TextField
      name="price"
      variant="outlined"
      label="price"
      fullWidth
      value={postData.price}
      onChange={(e) => setPostData({...postData, price: e.target.value})}
      />

      <TextField
      name="photo"
      variant="outlined"
      label="photo"
      fullWidth
      value={postData.photo}
      onChange={(e) => setPostData({...postData, photo: e.target.value})}
      />
      <div className={classes.fileInput}>
        <FileBaes
          type="file"
          multiple={true}
          onDone={({base64}) =>setPostData({...postData, selectedFile: base64})} />
      </div>
        <Button className={classes.buttonSubmit} variant ="container" color="primary" size="large" type="submit" fullWidth>Submit</Button>
         <Button variant ="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
}

export default Form;
