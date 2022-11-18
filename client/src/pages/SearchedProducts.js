import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Navigation from "../components/Navigation";
import axios from "axios";
import { addedTocart } from "../features/cartSlice";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "90%",
    marginTop: "5vh",
    margin: "0 auto",
  },
  productTitle: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  card: {
    boxShadow: "none",
  },
}));

function SearchedProducts(props) {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const query = useQuery();
  const search = query.get("query");
  const fetchFunction = async (url) => {
    const res = await axios
      .get(url)
      .then((res) => {
        return res.data.result.product;
      })
      .catch((err) => {
        console.log(err);
      });
    setProducts(res);
  };
  useEffect(() => {
    fetchFunction(`/products/search?query=${search}`);
  }, [search]);
  const classes = useStyles();
  const handleCart = (e) => {
    let element = "";
    if (e.target.classList.contains("MuiButton-label")) {
      element = e.target.parentElement.parentElement;
    } else {
      element = e.target.parentElement;
    }
    const id = element.getAttribute("id");
    const productToCart = products.filter((single) => single._id === id)[0];
    dispatch(addedTocart(productToCart));
  };
  return (
    <>
      <Navigation />
      <div className={classes.root}>
        <Typography variant="h5" noWrap gutterBottom={true}>
          Searched for '{search}'
        </Typography>
        <Grid container spacing={3}>
          {products &&
            products.map((singleProduct) => {
              return (
                <Grid item lg={3} md={4} xs={6} key={singleProduct._id}>
                  <Card className={classes.card}>
                    <Link
                      to={`/products/${singleProduct.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={singleProduct.name}
                          height="50%"
                          image={singleProduct.image}
                          title={singleProduct.name}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {singleProduct.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                    <CardActions>
                      <div
                        className={classes.productTitle}
                        id={singleProduct._id}
                      >
                        <Typography gutterBottom variant="h6" component="span">
                          Rs. {singleProduct.price}
                        </Typography>
                        <Button
                          size="small"
                          color="primary"
                          onClick={handleCart}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </div>
    </>
  );
}

export default SearchedProducts;
