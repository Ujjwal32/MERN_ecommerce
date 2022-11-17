import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
          // window.location.href = "/admin/products";
          return res.data.result.product;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return products;
  }
);

export const addCategory = createAsyncThunk(
  "category/added",
  async (name, { rejectWithValue }) => {
    const session = JSON.parse(sessionStorage.getItem("user-e-commerce"));
    const userToken = session && session.token;
    const category = await axios
      .post(
        "/category",
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

export const placeOrder = createAsyncThunk("payment/verified", async (data) => {
  console.log(data);
  await axios
    .post("/order", data)
    .then((res) => {
      alert("Your order has been placed!");
      localStorage.removeItem("cart");
      window.location.href = "/";
    })
    .catch((err) => {
      console.log(err);
    });
});

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
export const deleteCategory = createAsyncThunk(
  "category/deleted",
  async (id) => {
    const session = JSON.parse(sessionStorage.getItem("user-e-commerce"));
    const userToken = session && session.token;
    await axios
      .delete(`/category/${id}`, {
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
        `/category/${data.id}`,
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

const initialState = {
  status: "",
  products: [],
  category: [],
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
