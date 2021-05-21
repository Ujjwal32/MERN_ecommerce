import { Grid, makeStyles, Paper } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles( theme => ({
    root:{
        padding: theme.spacing(1),
        marginTop: theme.spacing(3)
    },
    paper: {
        minHeight: '50vh'
    }
}))

function DashboardGraph() {
    const classes = useStyles()
    return (
        <Grid container spacing={3} className={classes.root}>
            <Grid item xs={6}>
                <Paper className={classes.paper}>

                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper className={classes.paper}>

                </Paper>
            </Grid>
        </Grid>
    )
}

export default DashboardGraph
