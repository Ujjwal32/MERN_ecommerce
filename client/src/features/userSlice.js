import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "./constants";
import { toast } from "react-toastify";

const initialState = {
  status: "",
  user: [],
  allusers: [],
};

export const userLoggedIn = createAsyncThunk(
  "user/loggedin",
  async (details) => {
    const user = await axios
      .post(`${URL}/user/login`, details)
      .then((res) => {
        if (res.data.msg === "success") {
          sessionStorage.setItem("user-e-commerce", JSON.stringify(res.data));
          return res.data.user;
        } else if (res.data.msg === "Password or email mismatched!") {
          toast.error("Password or email mismatched!", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } else {
          toast.error("User not found", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return user;
  }
);
export const fetchUser = createAsyncThunk("user/fetched", async () => {
  const user = JSON.parse(sessionStorage.getItem("user-e-commerce"));
  return user.user;
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
          toast.error("User Updated please signin again!", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
          sessionStorage.removeItem("user-e-commerce");
          window.location.href = "/user/signin";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

export const deleteUser = createAsyncThunk("user/deleted", async (id) => {
  const del_id = await axios.delete(`${URL}/user/${id}`).then((res) => {
    console.log(res.data);
    if (res.data.msg === "Successful") {
      toast.success("User deleted!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return del_id;
    }
  });
});

export const fetchAllusers = createAsyncThunk(
  "user/fetchallusers",
  async () => {
    const session = JSON.parse(sessionStorage.getItem("user-e-commerce"));
    const userToken = session && session.token;
    const users = await axios
      .get(`${URL}/user`, {
        headers: {
          "x-auth": userToken,
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        return data.data.result.user;
      })
      .catch((err) => {
        console.log(err);
        toast.error("User deleted!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
    return users;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedOut(state, action) {
      sessionStorage.removeItem("user-e-commerce");
      state.user = [];
    },
  },
  extraReducers: {
    [fetchUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.status = "Success";
      state.user = state.user.concat(action.payload);
    },
    [fetchUser.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [userLoggedIn.pending]: (state, action) => {
      state.status = "loading";
      toast.success("Signing in...", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    },
    [userLoggedIn.fulfilled]: (state, action) => {
      state.status = "success";
      state.user = [];
      state.user = state.user.concat(action.payload);
    },
    [userLoggedIn.rejected]: (state, action) => {
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
    [deleteUser.pending]: (state, action) => {
      state.status = "loading";
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.allusers = state.allusers.filter(
        (user) => user._id !== action.payload
      );
      state.status = "Success";
      toast.success("User deleted!", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    },
    [fetchAllusers.fulfilled]: (state, action) => {
      state.allusers = action.payload;
    },
    [fetchAllusers.rejected]: (state, action) => {
      state.allusers = [];
      toast.error("Something went wrong.", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    },
  },
});
export const { userLoggedOut } = userSlice.actions;

export default userSlice.reducer;
