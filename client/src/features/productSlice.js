import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  fetchProducts,
  postProducts,
  updateProduct,
  deleteProduct,
  fetchProductsByCategory,
} from "./asyncTaskProduct";
import { addCategory } from "./asyncTaskCategory";
import { URL } from "./constants";

export const placeOrder = createAsyncThunk("payment/verified", async (data) => {
  console.log(data);
  await axios
    .post(`${URL}/order`, data)
    .then((res) => {
      alert("Your order has been placed!");
      localStorage.removeItem("cart");
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err);
    });
});

const initialState = {
  status: "",
  products: [],
  category: [],
  filtered: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducer: {},
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = "success";
      state.products = action.payload.products;
      state.category = action.payload.category;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = "failed";
      console.log(action.payload);
    },
    [fetchProductsByCategory.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchProductsByCategory.fulfilled]: (state, action) => {
      state.status = "success";
      state.filtered = action.payload;
    },
    [postProducts.fulfilled]: (state, action) => {
      state.status = "success";
      state.products = state.products.concat(action.payload);
    },
    [postProducts.pending]: (state, action) => {
      state.status = "loading";
    },
    [postProducts.rejected]: (state, action) => {
      state.status = "failed";
      console.log(action.payload);
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.status = "success";
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
    [updateProduct.pending]: (state, action) => {
      state.status = "loading";
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.status = "sucess";
    },
    [addCategory.pending]: (state, action) => {
      state.status = "loading";
    },
    [addCategory.fulfilled]: (state, action) => {
      state.status = "success";
      state.category = state.category.concat(action.payload.category);
    },
    [addCategory.rejected]: (state, { payload, error }) => {
      state.status = "failed";
      console.log(error);
    },
  },
});

export default productSlice.reducer;
