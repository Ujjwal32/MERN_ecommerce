import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons';
import React from 'react'
import { useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';


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
function CategoryTable() {
    const classes = useStyles()

    const category = useSelector( state => state.product.category[0]?.category)

    return (
    <TableContainer className={classes.table}>
        <Table  component={Paper} aria-label="spanning table">
            <TableHead>
            <TableRow>
                <TableCell >Category</TableCell>
                <TableCell align="right">Total Items</TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {
                    category && category.map(single => {
                        return <TableRow >
                            <TableCell className={classes.tableProduct}>
                                <Typography variant='h6'>{single.name}</Typography>
                            </TableCell>
                            {/* <TableCell align="right">3</TableCell> */}
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

export default CategoryTable
