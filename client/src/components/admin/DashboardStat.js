import React from 'react'
import { Card, Grid, makeStyles, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles( theme => ({
    root: {
        background: 'none',
        boxShadow: 'none',
        padding: theme.spacing(1)
    },
    card: {
        minHeight: '80px',
        padding: '5px',
        textAlign: 'center'
    }
}))

function DashboardStat() {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography variant='h6' gutterBottom={true}>Total Orders</Typography>
                            <Typography variant='p' gutterBottom={true}>20</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography variant='h6' gutterBottom={true}>Total Orders</Typography>
                            <Typography variant='p' gutterBottom={true}>20</Typography>
                        </Card>
                    </Grid> 
                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography variant='h6' gutterBottom={true}>Total Orders</Typography>
                            <Typography variant='p' gutterBottom={true}>20</Typography>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.card}>
                            <Typography variant='h6' gutterBottom={true}>Total Orders</Typography>
                            <Typography variant='p' gutterBottom={true}>20</Typography>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
    )
}

export default DashboardStat
