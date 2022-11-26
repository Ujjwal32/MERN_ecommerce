import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import DashboardSidebar from "../../components/admin/DashboardSidebar";
import UserTable from "../../components/admin/user/UserTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllusers } from "../../features/userSlice";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    position: "relative",
  },
}));

function Users() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.allusers);
  useEffect(() => {
    dispatch(fetchAllusers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Grid container>
      <Grid item xs={3}>
        <DashboardSidebar />
      </Grid>
      <Grid item xs={9} padding={2} className={classes.gridContainer}>
        <Typography
          variant="h4"
          gutterBottom={true}
          style={{ textAlign: "center", color: "#4fc4c9" }}
        >
          Users
        </Typography>
        <UserTable user={users} />
      </Grid>
    </Grid>
  );
}

export default Users;
