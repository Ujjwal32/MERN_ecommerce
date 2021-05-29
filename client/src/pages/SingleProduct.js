import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Navigation from '../components/Navigation'
import RelatedProducts from '../components/RelatedProducts'
import { addedTocart } from '../features/cartSlice'
import demo from '../image/demo.gif'
const useStyles = makeStyles(theme => ({
    container: {
        width: '90%',
        marginTop: '20px',
        margin: '0 auto',
        height: '80vh',
        
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        '& img':{
            height: '100%',
            width: '90%'
        }
    }
}))

function SingleProduct(props) {
    const path = props.match.params.id
    const classes = useStyles()
    const product = useSelector( state => state.product.products[0]?.product)
    const singleProduct = product && product.filter( single => single.slug === path)
    const dispatch = useDispatch()
    const loggedInUser = JSON.parse(sessionStorage.getItem('user-e-commerce'))

    if(singleProduct){
        const handleCart = (e) => {
            if(loggedInUser){
                dispatch(addedTocart(singleProduct[0]))
            } else {
                alert('Please Sign in first.')
            }
        }
        return (
            <>
                <Navigation />
                <Grid container className = {classes.container} spacing={3} style = {{marginTop: '15vh'}}>
                    <Grid item md={6} sm={6} className={classes.imageContainer}>
                        <img src={singleProduct[0]?.image || demo} alt='single product'/>
                    </Grid>
                    <Grid item md={6} sm={6} >
                        <Typography variant="h4" gutterBottom={true}>{singleProduct[0]?.name}</Typography>
                        <Typography variant="h6" gutterBottom={true}>Rs.{singleProduct[0]?.price}</Typography>
                        <Typography variant="p" conponent="p" paragraph={true}>
                            {singleProduct[0]?.descriptions}
                        </Typography>
                        
                        <Button
                            variant="contained"
                            color="primary"
                            onClick = {handleCart}
                        >
                            Add to cart
                        </Button>
                    </Grid>
                </Grid>
                <RelatedProducts />
            </>
        )
    } else {
        window.location.href = '/'
    }
}

export default SingleProduct
