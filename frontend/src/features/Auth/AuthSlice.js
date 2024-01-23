import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CreateUser, loginUser, resetPasswordRequest,
  resetPassword,
  loginDemoUser,} from "./AuthAPI";



const initialState = {
  loggedUser: JSON.parse(localStorage.getItem("user")),
  status: "idle",
  error: null,
  mailSent: false,
  passwordReset:false

};

export const CreateUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData,{ rejectWithValue }) => {
 try {
  const response = await CreateUser(userData);
  return response.data;
 } catch (error) {
  rejectWithValue(error)

 }

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
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const LoginDemoUserAsync = createAsyncThunk(
  "auth/LoginDemoUser",
  async (data, { rejectWithValue }) => {
    try {
      console.log("LoginDemoUserAsync")
      const response = await loginDemoUser();
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);


export const resetPasswordRequestAsync = createAsyncThunk(
  'user/resetPasswordRequest',
  async (email,{rejectWithValue}) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);

    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  'user/resetPassword',
  async (data,{rejectWithValue}) => {
    try {
      const response = await resetPassword(data);
      // console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
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
      .addCase(CreateUserAsync.rejected, (state, action) => {
        state.status = "erore";
        state.error = action.payload

      })

      .addCase(LoginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedUser = action.payload;
        // console.log(action.payload);

      })
      .addCase(LoginUserAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;

      })
      .addCase(LoginDemoUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginDemoUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedUser = action.payload;
        // console.log(action.payload);

      })
      .addCase(LoginDemoUserAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;

      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.mailSent = true;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload
      })

  },
});

export const SelectedLoggedUser = (state) => state.auth.loggedUser;
export const errore = (state) => state.auth.error;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;
export const AuthStatus = (state) => state.auth.status;
export const{logout}=AuthSlice.actions

export default AuthSlice.reducer;
