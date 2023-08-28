import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateOrder,fetchTotalOrders,updateOrder,CreateOrderWithCard } from "./OrderApi";
const initialState = {
    orders: [],
  status: "idle",
  error: null,
  currentOrder:null,
  totalOrders:[]
};

export const CreateOrderAsync = createAsyncThunk(
  "order/add",
  async ({order,token}, { rejectWithValue }) => {
    try {
      // console.log(item);
      const response = await  CreateOrder(order,token);
      return response.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);


export const fetchTotalOrdersAsync = createAsyncThunk(
  "order/Fetchorders",
  async ({pagination,sort,search_query,token}) => {
    const response = await fetchTotalOrders(pagination,sort,search_query,token);
    return response;

  }
);
export const updateOrderAsync = createAsyncThunk(
  "order/updateorder",
  async ({order,token}) => {
    const response = await updateOrder(order,token);
    return response;

  }
);




export const OrderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    resetOrder: (state) => {

      state.currentOrder = null;
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(CreateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CreateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload
      })
      .addCase(CreateOrderAsync.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      })

      .addCase(fetchTotalOrdersAsync.pending, (state, action) => {
        state.status = "loading";

      })
      .addCase(fetchTotalOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders = action.payload.data;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state, action) => {
        state.status = "loading";

      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.orders.findIndex(order=>order.id === action.payload.id)
        state.orders[index] = action.payload

      })

  },
});

export const Selectorders = (state) => state.order.orders;
export const ordersStatus = (state) => state.order.status;
export const currentOrder = (state) => state.order.currentOrder;
export const totalItems = (state) => state.order.totalOrders;
export const {resetOrder} = OrderSlice.actions
export default OrderSlice.reducer;
