import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import Orders from './Orders'
import EditProfile from './EditProfile'

const useStyles = makeStyles( theme => ({
    root: {
        height: '100%'
    },
    header: {
        textAlign: 'center'
    }
}))

function UserMainArea() {
    const classes = useStyles()
    const [orders,setOrders] = useState([])
    const user = useSelector(state => state.user.user[0]?.user)
    const userId = user && user?.id
    useEffect(()=> {
        userId && axios.get(`/order/${userId}`).then(res => {
            setOrders(res.data.order)
        })
    },[userId])

    return (
        <Grid container className={classes.root}>
            <Grid item md={6}>
                { user && <EditProfile user = {user} /> }
            </Grid>
            <Grid item md={6}>
                <Typography className = {classes.header} variant='h5' gutterBottom={true}>Your Orders</Typography>
                { orders.length !==0 && <Orders order={orders}/> }
            </Grid>
        </Grid>
    )
}

export default UserMainArea
