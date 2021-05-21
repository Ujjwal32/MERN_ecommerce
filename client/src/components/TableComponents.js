import { Button, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeQuantity, deleteCartItems, emptyCart } from '../features/cartSlice';

const useStyles = makeStyles({
    table: {
      width: '90%',
      marginTop: '15vh',
      margin: '0 auto'
    },
    thumbnail: {
        height: '100px',
        widht: '100px'
    },
    tableProduct: {
        display: 'flex',
        '& h6': {
            marginLeft: '10px'
        }
    },
    spanButton: {
      padding: '5px 15px',
      backgroundColor: '#f4f5fd',
      fontSize: '20px',
      margin: '8px',
      borderRadius: '8px',
      cursor: 'pointer',
      border: 'none'
    },
    total: {
      minHeight: '20vh',
      width: '20%',
      padding: '10px',
      boxSizing: "border-box",
      '& h6': {
        fontSize: '1rem'
      }
    },
    bottomInfo: {
      width: '90%',
      margin: '0 auto',
      display: 'flex',
      justifyContent: "space-between"
    },
    butButtons: {
      '& .MuiIconButton-root': {
        '&:hover': {
          background: 'none'
        }
      }
    },
    noItems: {
      marginTop: '15vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

function TableComponents() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const cartItems = useSelector(state => state.cart?.items) || []

    const handleClick = (e,buttonaction) => {
    const id = e.target.parentElement.getAttribute('id')
    dispatch(changeQuantity({id,buttonaction}))
    }

    const deleteClicked = (e) => {
      const clickedElem = e.target.parentElement //parent of clicked element
      let element = ''  
      if(clickedElem.classList.contains('MuiButton-label')){
        //span means it's parent is button
        element = clickedElem.parentElement.parentElement
      } else if(clickedElem.classList.contains('MuiSvgIcon-root')){
        //means path is clicked and clickedElem is svg 
        element = clickedElem.parentElement.parentElement.parentElement
      } else if(clickedElem.classList.contains('MuiButtonBase-root')){
        //means button is clicked
        element = clickedElem.parentElement
      } else {
        element = e.target.parentElement
      }
      
      const id = element.getAttribute('data-id')
      dispatch(deleteCartItems(id))
    }

    const clearCart = (e) => {
      dispatch(emptyCart())
    } 

    const total = cartItems && cartItems.reduce((accumulator,single) => {
      return accumulator + (single.quantity * single.price)
    },0)
    
    if(cartItems.length!==0){
      return (
        <>
          <TableContainer className={classes.table}>
              <Typography variant='h4' gutterBottom={true}>Your cart</Typography>
            <Table  component={Paper} aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell >Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Qty.</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {
                    cartItems.map(single => {
                      return <TableRow key={single._id}>
                        <TableCell className={classes.tableProduct}>
                            <img src={single.image} alt='thumbnail' className={classes.thumbnail}/>
                            <Typography variant='h6'>{single.name}</Typography>
                        </TableCell>
                        <TableCell align="right">Rs. {single.price}</TableCell>
                        <TableCell align="right" id={single._id}>
                          <button className={classes.spanButton} onClick={(e) => handleClick(e,'inc')}>+</button>
                          <span className='amount'>{single.quantity}</span>
                          <button className={classes.spanButton} onClick={(e) => handleClick(e,'dec')} disabled = { single.quantity === 1 && true}>-</button>
                        </TableCell>
                        <TableCell align="right">Rs. {single.quantity * single.price}</TableCell>
                        <TableCell align="right" data-id={single._id}>
                            <Button color='secondary' onClick={deleteClicked}>
                                <DeleteForever />
                            </Button>
                        </TableCell>
                      </TableRow>
                    })
                  }
              </TableBody>
            </Table>
          </TableContainer>
          <div className={classes.bottomInfo}>
            <div className={classes.butButtons}>
              <IconButton disableRipple={true}>
                <Button color='secondary' variant='contained' onClick={clearCart} disableRipple={true}>
                  <DeleteForever />
                  Clear Cart
                </Button>
              </IconButton>
              <Button color='primary' variant='contained' disableRipple={true} href='/checkout'>
                Place Order
              </Button>
            </div>
            <Paper className={classes.total}>
                <Typography variant='h6' gutterBottom={true}>Amount: Rs. {total}</Typography>
                <Typography variant='h6' gutterBottom={true}>VAT: 15%</Typography>
                <Typography variant='h6' gutterBottom={true}>Amount to pay: Rs. {total + total*0.15}</Typography>
            </Paper>
          </div>
        </>
        )
    } else {
      return(
        <div className={classes.noItems}>
          <Typography variant='h1' gutterBottom={true}>No items in the cart</Typography>
          <Button href='/'>Continue Shopping</Button>
        </div>
      )
    }
}

export default TableComponents
