import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateProduct } from "../../features/productSlice";
import useProduct from "./useProduct";

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

function EditModalForm({ handleClose, open, id }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const category = useSelector((state) => state.product.category);
  const loading = useSelector((state) => state.product.status);
  const product = useProduct(id);
  const [source, setSource] = useState(null);
  const [formData, setFormData] = useState();
  useEffect(() => {
    setFormData(product);
  }, [product]);
  const closeModal = () => {
    handleClose();
  };
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!source && !product.image) {
      alert("Image Required");
      return;
    }
    const imageEdited = source ? true : false;
    const image = source ? source : product.image;
    const data = { ...formData, image, imageEdited };
    dispatch(updateProduct(data)).then(() => {
      dispatch(fetchProducts()).then(() => closeModal());
    });
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSource(reader.result);
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
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
              Edit Product
            </Typography>
            <form
              className={classes.form}
              noValidate
              autoComplete="off"
              onSubmit={submitHandler}
            >
              <Input
                defaultValue={product?.name}
                name="name"
                placeholder="name of the product"
                onChange={changeHandler}
                required
              />
              <Input
                defaultValue={product?.price}
                placeholder="price"
                name="price"
                onChange={changeHandler}
              />
              <Input
                defaultValue={product?.stock}
                placeholder="stock"
                name="stock"
                onChange={changeHandler}
              />
              <Input
                defaultValue={product?.tags}
                placeholder="tags - strings separated by space"
                name="tags"
                onChange={changeHandler}
              />
              <TextField
                defaultValue={product?.descriptions}
                required
                multiline
                placeholder="description"
                name="descriptions"
                onChange={changeHandler}
              />
              <div className={classes.imageSelect}>
                <FormControl className={classes.formControl}>
                  <select
                    id="category_name"
                    value={product?.category_name}
                    onChange={changeHandler}
                    name="category_name"
                  >
                    {category &&
                      category.map((cat) => (
                        <option value={cat._id}>{cat.name}</option>
                      ))}
                  </select>
                </FormControl>
                <Input
                  placeholder="image"
                  name="image"
                  onChange={handleFileChange}
                  type="file"
                />
              </div>
              <div className={classes.thumbnail}>
                {formData?.image && <img src={formData.image} alt="product" />}
                {source && <img src={source} alt="product" />}
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={submitHandler}
                disabled={loading === "loading" ? true : false}
              >
                {loading === "loading" ? "Loading..." : "Edit"}
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditModalForm;
