import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams } from "react-router-dom";
import { currentOrder } from "../features/Order/OrderSlice";
import { SelectedLoggedUser } from "../features/Auth/AuthSlice";
import { resetCartAsync } from "../features/Cart/CartSlice";

import { resetOrder } from "../features/Order/OrderSlice";
import Toast from "../Toast/Toast";
const OrderSuccess = () => {
  let param = useParams();
  let dispatch = useDispatch();
  let user = useSelector(SelectedLoggedUser);


  useEffect(() => {
    dispatch(resetCartAsync(user.user));
    dispatch(resetOrder());

  }, [dispatch, user]);
  return (
    <>
     <Toast />
      {!param.id && <Navigate to="/" replace="true"></Navigate>}
      <main  style={{
        position:"absolute",
    top: "38%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "max-content"
      }} className="grid  place-items-center  px-6   lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">
            Order# {param.id}
          </p>
          <p className="mt-6 text-base leading-7 text-gray-600">
          You can check your order in My Account  My Orders
        </p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
            <Link to="/" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default OrderSuccess;
