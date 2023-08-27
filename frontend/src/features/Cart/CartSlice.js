import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AddToCart } from "./CartApi";
import { getUserCart,removeProduct ,handelqunatity,resetCart } from "./CartApi";

const initialState = {
  cart: [],
  status: "idle",
  error: null,
};

export const addToCartAsync = createAsyncThunk(
  "cart/add",
  async ({item,alert}, { rejectWithValue }) => {
    try {
      console.log(item);
      const response = await AddToCart(item);
      alert.success('Item Added to Cart');
      return response.data;

    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const getUserCartAsync = createAsyncThunk(
  "cart/getcart",

  async (user_id) => {
    const response = await getUserCart(user_id);
    return response.data;

  }
);

export const removeProductAsync = createAsyncThunk(
  "cart/removecart",

  async (productId, { rejectWithValue }) => {
    try {
      const response = await removeProduct(productId);
      return response.productId;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const handelQuantityAsync = createAsyncThunk(
  "cart/changeQuantity",

  async (value, { rejectWithValue }) => {
    try {
      const response = await handelqunatity(value);
      return response.data
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",

  async (userId ,{ rejectWithValue }) => {
    try {
      const response = await resetCart(userId);
      return response
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const CartSlice = createSlice({
  name: "cart",
  initialState,

  // reducers: {
  //   increment: (state) => {

  //     state.value += 1;
  //   },

  // },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart.push(action.payload);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })
      .addCase(getUserCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = action.payload;
      })
      .addCase(removeProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
      .addCase(handelQuantityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(handelQuantityAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload)
        const index = state.cart.findIndex(item=>item.id === action.payload.id)
       state.cart[index] = action.payload

      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action.payload)
        state.cart = []


      })
  },
});

export const cart = (state) => state.cart.cart;
export const cartStatus = (state) => state.cart.status;

export default CartSlice.reducer;
