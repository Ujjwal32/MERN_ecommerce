import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons';
import React from 'react'
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
function UserTable({user}) {
    const classes = useStyles()
    return (
    <TableContainer className={classes.table}>
        <Table  component={Paper} aria-label="spanning table">
            <TableHead>
            <TableRow>
                <TableCell >Photo</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                {
                    user && user.map(single => {
                        return <TableRow >
                        <TableCell className={classes.tableProduct} key={single._id}>
                            <img src={single.image} alt='thumbnail' className={classes.thumbnail}/>
                            <Typography variant='h6'>{single.name}</Typography>
                        </TableCell>
                        <TableCell align="right">{single.email}</TableCell>
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

export default UserTable
