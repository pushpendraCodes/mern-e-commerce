import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UpdateUser } from "./AuthAPI";
import { CreateUser, loginUser } from "./AuthAPI";
import { Navigate, json, useNavigate } from "react-router-dom";
const initialState = {
  loggedUser: JSON.parse(localStorage.getItem("user")),
  status: "idle",
  error: null,
};

export const CreateUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await CreateUser(userData);
    return response.data;
  }
);
export const UpdateUserAsync = createAsyncThunk(
  "auth/updateuser",
  async (update) => {
    const response = await UpdateUser(update);
    return response.data;
  }
);
export const LoginUserAsync = createAsyncThunk(
  "auth/LoginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUser(userData);
      // console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const AuthSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    logout: (state) => {
      localStorage.clear("user")
      state.loggedUser = null

    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(CreateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CreateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedUser = action.payload;
      })
      .addCase(LoginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedUser = action.payload;
        // console.log(action.payload);

      })
      .addCase(LoginUserAsync.rejected, (state, { payload }) => {
        state.status = "idle";
        state.error = payload;

      })
      .addCase(UpdateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedUser = action.payload;

        // console.log(action.payload);

      })
  },
});

export const SelectedLoggedUser = (state) => state.auth.loggedUser;
export const errore = (state) => state.auth.error;
export const{logout}=AuthSlice.actions

export default AuthSlice.reducer;
