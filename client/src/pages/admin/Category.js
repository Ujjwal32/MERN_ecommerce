import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useState } from "react";
import CategoryModal from "../../components/admin/category/CategoryModal";
import CategoryTable from "../../components/admin/category/CategoryTable";
import DashboardSidebar from "../../components/admin/DashboardSidebar";

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
