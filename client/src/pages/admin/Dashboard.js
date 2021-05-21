import { Grid, Typography } from '@material-ui/core'
import React from 'react'
import DashboardMain from '../../components/admin/DashboardMain'
import DashboardSidebar from '../../components/admin/DashboardSidebar'


function Dashboard() {
    return (
        <Grid container>
            <Grid item xs={3}>
                <DashboardSidebar />
            </Grid>
            <Grid item xs={9} padding={2}>
                <Typography variant='h3' gutterBottom={true} style={{textAlign: 'center',color: "rgb(70, 245, 245)"}}>Dashboard</Typography>
                <DashboardMain />
            </Grid>
        </Grid>
    )
}

export default Dashboard
