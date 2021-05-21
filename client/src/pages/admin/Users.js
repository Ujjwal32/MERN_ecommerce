import { Grid, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import DashboardSidebar from '../../components/admin/DashboardSidebar'
import DashboardTable from '../../components/admin/DashboardTable'

const useStyles = makeStyles( theme => ({
    gridContainer: {
        position: 'relative'
    }
}))

function Users() {
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item xs={3}>
                <DashboardSidebar />
            </Grid>
            <Grid item xs={9} padding={2} className={classes.gridContainer}>
                <Typography variant='h4' gutterBottom={true} style={{textAlign: 'center',color: "rgb(70, 245, 245)"}}>Users</Typography>
                <DashboardTable />
            </Grid>
        </Grid>
    )
}

export default Users
