import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles({
    table: {
      width: '90%',
      margin: '0 auto',
      marginTop: '60px'
    },
    thumbnail: {
        height: '80px',
        widht: '80px'
    },
    tableProduct: {
        display: 'flex',
        '& h6': {
            marginLeft: '10px'
        }
    }
  });
function DashboardTable() {
    const classes = useStyles()
    const products = useSelector(state => state.product.products[0]?.product)

    return (
    <TableContainer className={classes.table}>
        <Table  component={Paper} aria-label="spanning table">
            <TableHead>
            <TableRow>
                <TableCell >Product</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Stocks</TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {
                    products && products.map( singleProd => {
                        return <TableRow >
                        <TableCell className={classes.tableProduct} key={singleProd._id}>
                            <img src={singleProd.image} alt='thumbnail' className={classes.thumbnail}/>
                            <Typography variant='h6'>{singleProd.name}</Typography>
                        </TableCell>
                        <TableCell align="right">Rs. {singleProd.price}</TableCell>
                        <TableCell align="right">{singleProd.stock}</TableCell>
                        <TableCell align="right">
                            <Button color='secondary'>
                                <DeleteForever />
                            </Button>
                            <Button color='secondary'>
                                <EditIcon />
                            </Button>
                        </TableCell>
                        </TableRow>
                    })
                }
            </TableBody>
        </Table>
    </TableContainer>   
    )
}

export default DashboardTable
