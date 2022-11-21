import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import CategoryModal from "../../components/admin/category/CategoryModal";
import CategoryTable from "../../components/admin/category/CategoryTable";
import DashboardSidebar from "../../components/admin/DashboardSidebar";
// import { groupBy } from "../../utils";

const useStyles = makeStyles((theme) => ({
  buttonRoot: {
    position: "absolute",
    color: "#4fc4c9",
    border: "2px solid #4fc4c9",
    right: theme.spacing(6.5),
    "&:hover": {
      border: "2px solid #4fc4c9",
    },
  },
  gridContainer: {
    position: "relative",
  },
}));

function Category() {
  const [showModal, setShowModal] = useState(false);

  // const grouped = groupBy(products);
  // grouped.forEach((g) => {
  //   g["category_name"] = category.find((cat) => cat._id === g.category).name;
  // });
  const handleClick = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const classes = useStyles();
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
          Category
        </Typography>
        <Button
          color="primary"
          variant="outlined"
          className={classes.buttonRoot}
          onClick={handleClick}
        >
          Add Category
        </Button>
        <CategoryTable />
        <CategoryModal handleClose={handleClose} open={showModal} />
      </Grid>
    </Grid>
  );
}

export default Category;
