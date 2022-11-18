import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./constants";

export const addCategory = createAsyncThunk(
  "category/added",
  async (name, { rejectWithValue }) => {
    const session = JSON.parse(sessionStorage.getItem("user-e-commerce"));
    const userToken = session && session.token;
    const category = await axios
      .post(
        `${URL}/category`,
        { name },
        {
          headers: {
            "x-auth": userToken,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data?.msg === "Category added!") {
          window.location.href = "/admin/category";
        }
      })
      .catch((err) => {
        console.log(err);
        return rejectWithValue([], err);
      });
    return category;
  }
);
export const deleteCategory = createAsyncThunk(
  "category/deleted",
  async (id) => {
    const session = JSON.parse(sessionStorage.getItem("user-e-commerce"));
    const userToken = session && session.token;
    await axios
      .delete(`${URL}/category/${id}`, {
        headers: {
          "x-auth": userToken,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert(res.data?.err?.name || res.data.msg);
        window.location.href = "/admin/category";
      });
  }
);
export const updateCategory = createAsyncThunk(
  "category/updated",
  async (data) => {
    const session = JSON.parse(sessionStorage.getItem("user-e-commerce"));
    const userToken = session && session.token;
    await axios
      .put(
        `${URL}/category/${data.id}`,
        data,
        {
          headers: {
            "x-auth": userToken,
            "Content-Type": "application/json",
          },
        },
        data
      )
      .then((res) => {
        alert(res.data?.err?.name || res.data.msg);
        window.location.href = "/admin/category";
      });
  }
);
