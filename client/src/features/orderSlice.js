import axios from "axios";
import { URL } from "./constants";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchOrder = createAsyncThunk("order/fetch", async () => {
  const session = JSON.parse(sessionStorage.getItem("user-e-commerce"));
  const userToken = session && session.token;
  const orders = await axios
    .get(`${URL}/order`, {
      headers: {
        "x-auth": userToken,
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      return res.data.results.orders;
    });
  console.log(orders);
  return orders;
});

const initialState = {
  state: "",
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchOrder.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchOrder.fulfilled]: (state, action) => {
      state.status = "success";
      state.orders = action.payload;
    },
    [fetchOrder.pending]: (state, action) => {
      state.status = "failed";
    },
  },
});

export default orderSlice.reducer;
