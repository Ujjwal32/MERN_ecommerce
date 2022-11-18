import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./constants";

const initialState = {
  status: "",
  user: [],
};

export const userLoggedIn = createAsyncThunk(
  "user/loggedin",
  async (details) => {
    axios
      .post(`${URL}/user/login`, details)
      .then((res) => {
        if (res.data.msg === "success") {
          sessionStorage.setItem("user-e-commerce", JSON.stringify(res.data));
          window.location.href = "/user/profile";
        } else if (res.data.msg === "Password or email mismatched!") {
          alert("Password or email mismatched!");
        } else {
          alert("User not found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
export const fetchUser = createAsyncThunk("user/fetched", async () => {
  const user = JSON.parse(sessionStorage.getItem("user-e-commerce"));
  return user;
});
export const updateUser = createAsyncThunk(
  "user/updated",
  async (userdetails) => {
    const { id, details } = userdetails;
    await axios
      .put(`${URL}/user/${id}`, details)
      .then((res) => {
        if (res.data.msg === "User updated successfully!") {
          alert("User Updated please signin again!");
          sessionStorage.removeItem("user-e-commerce");
          window.location.href = "/user/signin";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedOut(state, action) {
      sessionStorage.removeItem("user-e-commerce");
      window.location.href = "/";
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = "Loading";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "Success";
      state.user = state.user.concat(action.payload);
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [updateUser.pending]: (state, action) => {
      state.status = "Loading";
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = "Success";
      // state.user = state.user.concat(action.payload)
    },
    [updateUser.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});
export const { userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
