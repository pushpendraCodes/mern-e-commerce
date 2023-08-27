import { configureStore } from "@reduxjs/toolkit";

import productReducer from "../features/ProductList/ProductListSlice";
import AuthReducer from "../features/Auth/AuthSlice";
import cartReducer from "../features/Cart/CartSlice";
import orderReducer from "../features/Order/OrderSlice"
import userReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: AuthReducer,
    cart: cartReducer,
    order:orderReducer,
    user:userReducer

  },
});
