import { Button, Input, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import KhaltiCheckout from "khalti-checkout-web";
import axios from 'axios'
import { placeOrder } from '../features/productSlice';


const useStyles = makeStyles( theme => ({
    form:{
        display: 'flex',
        width: '90%',
        margin: '0 auto',
        flexDirection: "column",
        '& .MuiInput-root': {
            height: theme.spacing(8)
        }
      },
      shippingDetails: {
          marginTop: theme.spacing(3)
      },
      buttons: {
          display: 'flex',
          justifyContent: 'space-around',
          marginTop: theme.spacing(2)
      }
}))

function CheckoutForm() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const user = useSelector( state => state.user.user[0]?.user)
    const order = useSelector( state => state.cart.items)
    const total = order.reduce((accumulator,single) => {
        return accumulator + (single.quantity * single.price)
    },0)
    const totalWithVat = total + (total*0.15)

    const products = order.map( single => {
        return { product: single._id, quantity: single.quantity}
    })

    const id = user?.id
    const [details,setDetails] = useState({
        name: '',
        email: '',
        state: '',
        city: '',
        street: '',
        houseNo: ''
    })

    const changeHandler = (e) => {
        setDetails({ ...details,[e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(placeOrder({user: id,products,shippingDetails: details,totalPrice: totalWithVat }))
        
    }
    let config = {
        "publicKey": "test_public_key_3b14aec6e3f1410b93d4e37e90f7a40f",
        "productIdentity": "1234567890",
        "productName": "buy-it",
        "productUrl": "http://localhost:3000/products",
        "eventHandler": {
            onSuccess (payload) {
                // hit merchant api for initiating verfication
                console.log(payload);
                axios.post('http://localhost:4000/order/payment', payload)
                .then(data => {
                  if(data.data?.state?.name === 'Completed'){
                    // payment();
                    alert('Payment Success!')
                    dispatch(placeOrder({user: id,products,shippingDetails: details,totalPrice: totalWithVat,payment: 'verified' }))
                  }
                })
            },
            onError (error) {
                console.log(error);
            },
            onClose () {
                console.log('widget is closing');
            }
        },
        "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    };
    
    let checkout = new KhaltiCheckout(config);
    
      const handlePayment = () => {
          // minimum transaction amount must be 10, i.e 1000 in paisa.
        checkout.show({amount: totalWithVat});
      }

    return (
        <form className={classes.form} autoComplete="off" onSubmit={submitHandler}>
                <Input  name='name' placeholder='Your Name' onChange={changeHandler}  required={true}/>
                <Input placeholder="email" name='email' type='email' onChange={changeHandler} required={true}/>
                <Typography variant='h5' gutterBottom={true} className={classes.shippingDetails}>Shipping Details</Typography>
                <Input  name='state' placeholder='State' onChange={changeHandler}  required={true}/>
                <Input placeholder="city" name='city' onChange={changeHandler} required={true}/>
                <Input placeholder="street" name='street' onChange={changeHandler} required={true}/>
                <Input placeholder="houseNo" name='houseNo' onChange={changeHandler} required={true}/>
                
               <div className={classes.buttons}>
                <Button type='Button' variant='contained' color='primary' onClick={handlePayment}>Pay With Khalti</Button>
                <Button type='submit' variant='contained' color='primary' >Cash On delivery</Button>
               </div>
            </form>
    )
}

export default CheckoutForm
