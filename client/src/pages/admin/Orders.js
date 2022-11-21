import React, { useState } from "react";
import { useSelector } from "react-redux";
import DashboardSidebar from "../../components/admin/DashboardSidebar";
import {
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    position: "relative",
  },
  table: {
    width: "98%",
    marginTop: "10vh",
    marginRight: "1rem",
  },
  orderContainer: {
    marginTop: "2rem",
  },
  orderBtn: {
    border: "none",
    width: "4.5rem",
    height: "2.5rem",
    cursor: "pointer",
    "&:focus": {
      backgroundColor: "#B9D9EB",
    },
  },
  allBtn: {
    backgroundColor: "#7CB9E8",
  },
  deliveredBtn: {
    backgroundColor: "#0ccf9f",
    margin: "0 1rem",
  },
  pendingBtn: {
    backgroundColor: "#cfcd0c",
  },
}));

function Orders() {
  const classes = useStyles();
  const orders = useSelector((state) => state.order.orders);
  const [filteredOrder, setFilteredOrder] = useState(orders);

  const handleFilter = (state) => {
    if (state === "all") {
      setFilteredOrder(orders);
    } else if (state === "delivered") {
      const deliveredOrders = orders.filter((order) => order.deliveryStatus);
      setFilteredOrder(deliveredOrders);
    } else {
      const pendingOrders = orders.filter((order) => !order.deliveryStatus);
      setFilteredOrder(pendingOrders);
    }
  };

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
          Orders
        </Typography>
        <div className={classes.orderContainer}>
          <div className={classes.orderTabs}>
            <button
              className={`${classes.orderBtn} ${classes.allBtn}`}
              onClick={() => handleFilter("all")}
            >
              All
            </button>
            <button
              className={`${classes.orderBtn} ${classes.deliveredBtn}`}
              onClick={() => handleFilter("delivered")}
            >
              Delivered
            </button>
            <button
              className={`${classes.orderBtn} ${classes.pendingBtn}`}
              onClick={() => handleFilter("pending")}
            >
              Pending
            </button>
          </div>
        </div>
        <TableContainer className={classes.table}>
          <Table component={Paper} aria-label="spanning table">
            <TableHead>
              <TableRow>
                <TableCell>Order Id</TableCell>
                <TableCell>User</TableCell>
                <TableCell align="right">Number of Items</TableCell>
                <TableCell align="right">Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrder &&
                filteredOrder.map((order) => {
                  return (
                    <TableRow key={order._id}>
                      <TableCell className={classes.tableProduct}>
                        {order._id}
                      </TableCell>
                      <TableCell>{order.user.name}</TableCell>
                      <TableCell align="right">
                        {order.products.length}
                      </TableCell>
                      <TableCell align="right">
                        Rs. {order.totalPrice}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default Orders;
