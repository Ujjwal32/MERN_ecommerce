import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import CheckoutForm from '../components/CheckoutForm'
import demo from '../image/demo.gif'

const useStyles = makeStyles( theme => ({
    root: {
        height: '100vh',
    },
    image: {
        width: '50%',
        height: '100%'
    }

}))

function Checkout() {
    const classes = useStyles()

    return (
        <Grid container className={classes.root}>
            <Grid item md={6} >
                <img src={demo} alt='nothing' className={classes.image} style={{position: 'fixed',height: '100vh'}}/>
            </Grid>
            <Grid item md={6}>
                <Typography variant='h4' gutterBottom={true} style={{marginLeft: '5%'}}>Payment And Shipping Details</Typography>
                <CheckoutForm />
            </Grid>
        </Grid>
    )
}

export default Checkout
