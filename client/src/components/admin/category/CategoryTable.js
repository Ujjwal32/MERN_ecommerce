import {
  Button,
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
import { DeleteForever } from "@material-ui/icons";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import CategoryModal from "./CategoryModal";
import { deleteCategory } from "../../../features/asyncTaskCategory";

const useStyles = makeStyles({
  table: {
    width: "90%",
    margin: "0 auto",
    marginTop: "60px",
  },
  thumbnail: {
    height: "80px",
    widht: "80px",
  },
  tableProduct: {
    display: "flex",
    "& h6": {
      marginLeft: "10px",
    },
  },
});
function CategoryTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.product.category[0]?.category);

  const [showModal, setShowModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState({});
  const openModal = (id, name) => {
    setShowModal(true);
    setSelectedCat({ id, name });
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const deleteCat = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <TableContainer className={classes.table}>
      <Table component={Paper} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Total Items</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {category &&
            category.map((single) => {
              return (
                <TableRow key={single._id}>
                  <TableCell className={classes.tableProduct}>
                    <Typography variant="h6">{single.name}</Typography>
                  </TableCell>
                  {/* <TableCell align="right">3</TableCell> */}
                  <TableCell align="right">
                    <Button
                      color="secondary"
                      onClick={() => deleteCat(single._id)}
                    >
                      <DeleteForever />
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => {
                        openModal(single._id, single.name);
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <CategoryModal
        handleClose={handleClose}
        open={showModal}
        title="Edit Category"
        editable={selectedCat}
        edit={true}
      />
    </TableContainer>
  );
}

export default CategoryTable;
