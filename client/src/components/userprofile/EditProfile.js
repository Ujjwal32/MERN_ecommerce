import { Button, makeStyles, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import axios from 'axios'
import { updateUser } from '../../features/userSlice'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles( theme => ({
    root: {
        margin: theme.spacing.apply(2),
        width: '100%'
    },
    editdetails: {
        width: '100%',
        marginTop: theme.spacing(2),
        '& .MuiTextField-root': {
            width: '90%',
            margin: theme.spacing(1)
        },
        '& .MuiButton-root': {
            padding: theme.spacing(1 ,2),
            margin: '0 auto',
            display: 'block'
        }
    }
}))


function EditProfile({ user }) {
    const classes = useStyles()
    const dispatch = useDispatch()

    const id = user.id
    const [details, setDetails] = useState({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        ...user
    })
    const changeDetails = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({id,details}))
    }

    return (
        <div className={classes.root}>
            <Typography variant='h5' gutterBottom={true}>Edit your details</Typography>
            <form className={classes.editdetails} onSubmit={submitHandler}>
                <TextField variant = 'outlined' label='Name' defaultValue={details.name} name='name' type='text' placeholder='Enter new name' onChange = {changeDetails}/>
                <TextField variant = 'outlined' label='Email' defaultValue={details.email} name='email' type='email' placeholder='Enter new email' onChange = {changeDetails}/>
                <TextField variant = 'outlined' label='Mobile' defaultValue={details.mobile} name='mobile' type='text' placeholder='Enter new phone' onChange = {changeDetails}/>
                <Button variant='contained' color= 'primary' type='submit'>
                    Edit
                </Button>
            </form>
        </div>
    )
}

export default EditProfile
