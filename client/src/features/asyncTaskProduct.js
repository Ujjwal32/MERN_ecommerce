import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./constants";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const products = await axios
      .get(`${URL}/products?page=1&limit=8`)
      .then((res) => {
        return res.data.result.product;
      });
    const category = await axios.get(`${URL}/category`).then((res) => {
      return res.data.result.category;
    });
    return { products, category };
  }
);

export const postProducts = createAsyncThunk(
  "products/postProducts",
  async (data) => {
    const session = JSON.parse(sessionStorage.getItem("user-e-commerce"));
    const userToken = session && session.token;
    const products = await axios
      .post(`${URL}/products`, data, {
        headers: {
          "x-auth": userToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data?.msg === "Successfully added!") {
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
      .put(`${URL}/products/${data._id}`, data, {
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
      .delete(`${URL}/products/${id}`, {
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

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category) => {
    const products = await axios
      .get(`${URL}/products/category/${category}`)
      .then((res) => {
        return res.data.result.product;
      });
    return products;
  }
);
