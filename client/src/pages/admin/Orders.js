import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import DashboardSidebar from "../../components/admin/DashboardSidebar";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    position: "relative",
  },
}));

function Orders() {
  const classes = useStyles();
  const [orders, setOrders] = useState();
  const session = JSON.parse(sessionStorage.getItem("user-e-commerce"));
  const userToken = session && session.token;

  useEffect(() => {
    const fetchOrder = async () => {
      const order = await axios
        .get("/order", {
          headers: {
            "x-auth": userToken,
            "Content-Type": "application/json",
          },
        })
        .then((data) => {
          return data.data.results.orders;
        })
        .catch((err) => {
          console.log(err);
          alert("something went wrong");
        });
      setOrders(order);
    };
    fetchOrder();
  }, [userToken]);
  return (
    <Grid container>
      <Grid item xs={3}>
        <DashboardSidebar />
      </Grid>
      <Grid item xs={9} padding={2} className={classes.gridContainer}>
        <Typography
          variant="h4"
          gutterBottom={true}
          style={{ textAlign: "center", color: "rgb(70, 245, 245)" }}
        >
          Orders
        </Typography>
        {orders && <></>}
      </Grid>
    </Grid>
  );
}

export default Orders;
