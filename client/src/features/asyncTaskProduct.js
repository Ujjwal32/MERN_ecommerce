import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const products = await axios.get("/products?page=1&limit=5").then((res) => {
      return res.data.result.product;
    });
    const category = await axios.get("/category").then((res) => {
      return res.data.result.category;
    });
    return { products, category };
  }
);

export const postProducts = createAsyncThunk(
  "products/postProducts",
  async (data) => {
    console.log("Working till start of post product");
    const session = JSON.parse(sessionStorage.getItem("user-e-commerce"));
    const userToken = session && session.token;
    console.log("working till start of axios");
    const products = await axios
      .post("/products", data, {
        headers: {
          "x-auth": userToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data?.msg === "Successfully added!") {
          console.log(res);
          return res.data.result.product;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return products;
  }
);
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (data) => {
    const session = JSON.parse(sessionStorage.getItem("user-e-commerce"));
    const userToken = session && session.token;
    const products = await axios
      .put(`/products/${data._id}`, data, {
        headers: {
          "x-auth": userToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data?.msg === "Product Updated Successfully!") {
          return res.data.result.product;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return products;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleted",
  async (id) => {
    const session = JSON.parse(sessionStorage.getItem("user-e-commerce"));
    const userToken = session && session.token;
    await axios
      .delete(`/products/${id}`, {
        headers: {
          "x-auth": userToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert(res.data?.err?.name || res.data.msg);
        return id;
      })
      .catch((err) => console.log(err));
  }
);
