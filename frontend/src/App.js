import React, { useEffect } from "react";

import Home from "./Pages/Home";

import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import CartPage from "./Pages/CartPage";
import CheckOutPage from "./Pages/CheckOutPage";

import ProductDetailsPage from "./Pages/ProductDetailsPage";
import ProtectedRoute from "./features/Auth/Component/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { getUserCartAsync } from "./features/Cart/CartSlice";

import NotFoundpage from "./Pages/NotFoundpage";
import OrderSuccess from "./Pages/OrderSuccess";
import UserOrdersPage from "./Pages/UserOrdersPage";

import ProfilePage from "./Pages/ProfilePage";
import AdminProtected from "./features/Auth/Component/AdminProtected";

import AdminHome from "./Pages/AdminHome";
import { AdminProductFormPage } from "./Pages/AdminProductFormPage";

import AdminOrdersPage from "./Pages/AdminOrdersPage";

import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import {
  fetchLoggedInUserAsync,

} from "./features/user/userSlice";
import ForgetPass from "./features/Auth/Component/ForgetPass";
import ResetPassword from "./features/Auth/Component/ResetPass";
import StripeCheckout from "./Pages/StripeCheckout";
import CheckoutForm from "./Pages/CheckoutForm";
import About from "./features/common/About";
import Contact from "./features/common/Contact";
import { SelectedLoggedUser } from "./features/Auth/AuthSlice";
export default function App() {
  let dispatch = useDispatch();

  let user = useSelector(SelectedLoggedUser)
  // console.log(user, "user1");

  const options = {
    timeout: 5000,
    position: positions.BOTTOM_LEFT,
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserAsync(user));
      dispatch(getUserCartAsync(user));
    }
  }, [dispatch, user]);





  return (
    <>
      <Provider template={AlertTemplate} {...options}>
        <Router>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/about" exact element={<About />} />
            <Route path="/contact" exact element={<Contact />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckOutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/product-details/:id"
              element={
                <ProtectedRoute>
                  <ProductDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <NotFoundpage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/order-success/:id"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stripe-checkout"
              element={
                <ProtectedRoute>
                  <StripeCheckout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout-form"
              element={
                <ProtectedRoute>
                  <CheckoutForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Orders"
              element={
                <ProtectedRoute>
                  <UserOrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminProtected>
                  <AdminHome />
                </AdminProtected>
              }
            />
            <Route
              path="/admin/product-form"
              element={
                <AdminProtected>
                  <AdminProductFormPage />
                </AdminProtected>
              }
            />
            <Route
              path="/admin/product-form/:id"
              element={
                <AdminProtected>
                  <AdminProductFormPage />
                </AdminProtected>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminProtected>
                  <AdminOrdersPage />
                </AdminProtected>
              }
            />

            <Route path="/forgot-password" element={<ForgetPass />} />
            <Route path="/reset-password/" element={<ResetPassword />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}
