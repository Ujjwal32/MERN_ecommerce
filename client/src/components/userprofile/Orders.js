import {
  Card,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  cardBody: {
    margin: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    padding: "0",
  },
  image: {
    height: theme.spacing(11),
    width: theme.spacing(11),
  },
}));

function Orders({ order }) {
  const classes = useStyles();

  if (order.length !== 0) {
    return (
      <>
        {order.map((single) => {
          return (
            <div key={single._id}>
              <div className={classes.root}>
                {single.products.map((product) => {
                  return (
                    <Card
                      className={classes.cardBody}
                      raised={false}
                      key={product._id}
                    >
                      <CardMedia
                        className={classes.image}
                        component="img"
                        alt={product.product?.name}
                        height="50%"
                        image={product?.product?.image}
                        title={product.product?.name}
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="span"
                        >
                          {product?.product?.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {product?.product?.price}
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <Typography variant="h5" gutterBottom={true}>
                Total: Rs.{single.totalPrice}
              </Typography>
              <Typography variant="subtitle2" gutterBottom={true}>
                Amount: {single.payment === "verified" ? "paid" : "due"}
              </Typography>
            </div>
          );
        })}
      </>
    );
  } else {
    return <h4>No orders yet!</h4>;
  }
}

export default Orders;
