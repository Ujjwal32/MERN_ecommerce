import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import DashboardSidebar from '../../components/admin/DashboardSidebar'
import DashboardTable from '../../components/admin/DashboardTable'
import ModalForm from '../../components/admin/ModalForm'

const useStyles = makeStyles( theme => ({
    buttonRoot: {
        position: 'absolute',
        color: 'rgb(70, 245, 245)',
        border: '2px solid rgb(70, 245, 245)',
        right: theme.spacing(6.5),
        '&:hover': {
            border: '2px solid rgb(70, 245, 245)'
        }
    },
    gridContainer: {
        position: 'relative'
    }
}))

function Products() {
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        setShowModal(true)
    }
    const handleClose = () => {
        setShowModal(false)
    }
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item xs={3}>
                <DashboardSidebar />
            </Grid>
            <Grid item xs={9} padding={2} className={classes.gridContainer}>
                <Typography variant='h4' gutterBottom={true} style={{textAlign: 'center',color: "rgb(70, 245, 245)"}}>Products</Typography>
                <Button color='primary' variant='outlined' className={classes.buttonRoot} onClick={handleClick}>
                    Add Product
                </Button>
                <DashboardTable />
                <ModalForm handleClose={handleClose} open={showModal}/>
            </Grid>
        </Grid>
    )
}

export default Products
