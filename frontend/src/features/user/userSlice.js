
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchOrdersByUserId, paginationOrders,fetchLoggedInUser, UpdateUser } from './userApi';


const initialState = {
  orders: [],
  status: 'idle',
  itemPerpage:3,
  totalOrders:null,
  userInfo: null,
}

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async (user) => {
    // console.log(user)
    const response = await fetchLoggedInUser(user);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



  export const UpdateUserAsync = createAsyncThunk(
    "auth/updateuser",
    async ({newAds,token}) => {
      console.log(newAds,token,"token")
      const response = await UpdateUser(newAds,token);
      return response.data;
    }
  );
export const fetchOrdersByUserIdAsync = createAsyncThunk(
    "user/paginationOrders",
    async ({pagination,id,token},{ rejectWithValue }) => {
      try {
        // console.log(pagination,id,"data");
        const response = await  fetchOrdersByUserId(pagination,id,token);
        return response
      } catch (error) {
        rejectWithValue(error);
      }
    }
  );



export const UserSlice = createSlice({
  name: 'user',
  initialState,


  extraReducers: (builder) => {
    builder
    .addCase(fetchOrdersByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.data;
        state.totalOrders = action.payload.totalOrders
      })
    // .addCase(paginationOrdersIdAsync.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(paginationOrdersIdAsync.fulfilled, (state, action) => {
    //     state.status = "idle";
    //     state.orders = action.payload.data
    //     state.totalOrders = action.payload.totalOrders
    //   })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this info can be different or more from logged-in User info
        state.userInfo = action.payload;
      })
      .addCase(UpdateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;

        // console.log(action.payload);

      })
  },
});


export const userOrders = (state) => state.user.orders;
export const orderStatus = (state) => state.user.status;
export const itemPerPage = (state) => state.user.itemPerpage;
export const totalOrders = (state) => state.user.totalOrders;
export const logged_user_details = (state) => state.user.userInfo;
export default UserSlice.reducer;
