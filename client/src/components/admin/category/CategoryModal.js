import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import {
  Button,
  FormControl,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import {
  addCategory,
  updateCategory,
} from "../../../features/asyncTaskCategory";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "50vw",
    margin: "0 auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: "100%",
    padding: theme.spacing(5),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& .MuiInput-root": {
      height: theme.spacing(8),
    },
  },
  heading: {
    textAlign: "center",
  },
  button: {
    width: theme.spacing(10),
    marginTop: theme.spacing(4),
    margin: "0 auto",
  },
  imageSelect: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiInput-root": {
      width: "50%",
    },
    "& .MuiFormControl-root": {
      width: "50%",
    },
  },
  thumbnail: {
    height: "100px",
    width: "100px",
    marginTop: theme.spacing(3),
    "& img": {
      height: "100%",
    },
  },
}));

function CategoryModal({ handleClose, open, title, editable, edit }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const closeModal = () => {
    handleClose();
  };
  const changeHandler = (e) => {
    setName(e.target.value);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (name === "") {
      alert("Category name cannot be empty. ");
    } else if (edit === true) {
      dispatch(updateCategory({ ...editable, name }));
    } else {
      dispatch(addCategory(name));
    }
  };

  return (
    <div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography
              variant="h5"
              className={classes.heading}
              gutterBottom={true}
            >
              {title || "Add Category"}
            </Typography>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={submitHandler}
            >
              <Input
                defaultValue={editable?.name || name}
                name="name"
                placeholder="name of the product"
                onChange={changeHandler}
                required={true}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default CategoryModal;
