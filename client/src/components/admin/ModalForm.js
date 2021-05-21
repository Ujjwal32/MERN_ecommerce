import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, FormControl, Input, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { postProducts } from '../../features/productSlice';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '50vw',
    margin: '0 auto'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: '100%',
    padding: theme.spacing(5)
  },
  form:{
    display: 'flex',
    flexDirection: "column",
    '& .MuiInput-root': {
        height: theme.spacing(8)
    }
  },
  heading: {
      textAlign: 'center'
  },
  button: {
    width: theme.spacing(10),
    marginTop: theme.spacing(4),
    margin: '0 auto'
  },
  imageSelect: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiInput-root': {
      width: '50%'
    },
    '& .MuiFormControl-root': {
      width: '50%'
    }
  },
  thumbnail: {
    height: '100px',
    width: "100px",
    marginTop: theme.spacing(3),
    '& img': {
      height: "100%"
    }
  }
}))

function ModalForm({ handleClose,open }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const category = useSelector( state => state.product.category[0]?.category)

  const [source, setSource] = useState();
  const [formData, setFormData] = useState({
      name: '',
      price: '',
      category: '',
      descriptions: '',
      image: '',
      stock: '',
      tags: ''
  })
  const closeModal = () => {
    handleClose();
  };
  const changeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const submitHandler = (e) => {
      e.preventDefault();
      if(!source){
        alert('Image Required')
      }
      const data = { ...formData, image: source}
      dispatch(postProducts(data))
  }

  const previewFile = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSource(reader.result)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    previewFile(file)
  }

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant = 'h5' className={classes.heading} gutterBottom={true}>Add Products</Typography>
            <form className={classes.form} noValidate autoComplete="off" onSubmit={submitHandler}>
                <Input defaultValue={formData.name} name='name' placeholder='name of the product' onChange={changeHandler}  required/>
                <Input placeholder="price" name='price' onChange={changeHandler}/>
                <Input placeholder="stock" name='stock' onChange={changeHandler}/>
                <Input placeholder="tags - strings separated by space" name='tags' onChange={changeHandler}/>
                <TextField required multiline  placeholder='description' name='descriptions' onChange={changeHandler}/>
                <div className={classes.imageSelect}>
                  <FormControl className={classes.formControl}>
                      <Select
                      labelId="category"
                      id="category"
                      value={formData.category}
                      onChange={changeHandler}
                      name='category'
                    >
                      {
                        category && category.map( single => <MenuItem value={single._id}>{single.name}</MenuItem>)
                      }
                    </Select>
                  </FormControl>
                  <Input placeholder="image" name='image' onChange={handleFileChange} type='file'/>
                </div>
                { source && <div className={classes.thumbnail}><img src={source} alt='product'/></div>}
                <Button type='submit' variant='contained' color='primary' className={classes.button}>Submit</Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default ModalForm