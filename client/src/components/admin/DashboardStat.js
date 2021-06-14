import React, { useEffect } from 'react'
import { Card, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import { fetchOrder } from '../../features/orderSlice';
import { useDispatch, useSelector }  from 'react-redux'

const useStyles = makeStyles( theme => ({
    root: {
        background: 'none',
        boxShadow: 'none',
        padding: theme.spacing(1)
    },
    card: {
        minHeight: '80px',
        padding: '5px',
        textAlign: 'center'
    }
}))

function DashboardStat() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const state = useSelector(state => state.order.orders)
    console.log(state)
    useEffect(() => {
        dispatch(fetchOrder())
    },[])

    const filterOrders = () => {
        const undeliveredProd = state && state.filter( single => single.deliveryStatus === false)

        return undeliveredProd;
    }

    return (
        <Paper className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography variant='h6' gutterBottom={true}>Total Orders</Typography>
                            <Typography variant='p' gutterBottom={true}>{state && state.length}</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography variant='h6' gutterBottom={true}>Today's Orders</Typography>
                            <Typography variant='p' gutterBottom={true}>20</Typography>
                        </Card>
                    </Grid> 
                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography variant='h6' gutterBottom={true}>Deliver Pending</Typography>
                            <Typography variant='p' gutterBottom={true}>{filterOrders().length}</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography variant='h6' gutterBottom={true}>Delivered Today</Typography>
                            <Typography variant='p' gutterBottom={true}>20</Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
    )
}

export default DashboardStat
