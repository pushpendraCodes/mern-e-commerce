import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { cart, cartStatus, handelQuantityAsync, removeProductAsync } from "./CartSlice";
import { BsCart4 } from "react-icons/bs";
import { price_Calc } from "../../app/Costant";
import { logged_user_details } from "../user/userSlice";
import Loader from "../common/Loader";

export default function Cart() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();

  let Cart = useSelector(cart);
  // console.log(Cart);

  let user = useSelector(logged_user_details)
  let status = useSelector(cartStatus)

  let totalAmount = () => {
     let Subtotal = Cart.reduce(
      (amount, item) => price_Calc(item.product.price ,item.product.discountPercentage) * item.quantity + amount,
      0
    );
    return Subtotal
  };


  let totalItems = Cart.reduce((total, item) => total + item.quantity, 0);

  const removeProduct = (e, productId) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user"))
    dispatch(removeProductAsync({productId,token:user.token}));
  };
  const handelQuantity = (e, id) => {
    // console.log(e.target.value);
    let user = JSON.parse(localStorage.getItem("user"))
    dispatch(handelQuantityAsync({ quantity: +e.target.value, id: id ,token:user.token }));
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#032a39" }}
        className="mx-auto my-5 rounded-md  max-w-4xl px-4 sm:px-6 lg:px-8"
      >
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-center my-10  ">
            <img className="h-10 w-10" src="trolley.png" alt="" />
            <h1 className="text-4xl mx-5 text-center font-bold tracking-tight text-white">
              Cart
            </h1>

          </div>
          <div className="flex justify-center items-center">
          {status==='loading' && <Loader loaderColor="white" textColor="white" />}
          </div>
          <div className="flow-root mt-5">
            <ul role="list" className="-my-6  ">
              {Cart.length > 0 ? (
                Cart.map(({ product, quantity, id }) => (
                  <li
                    key={product.id}
                    className="flex py-6 my-2 bg-white  hover:bg-green-200 rounded-lg  p-5 "
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md  ">
                      <img
                        src={product?.thumbnail}
                        alt={product?.title}
                        className="h-full w-full object-cover object-center"
                        style={{
                          borderRadius: "50%",
                          width: "5.5rem",
                          height: "5.5rem",
                          margin: "auto",
                          objectFit: "cover",
                          // border: "2px solid pink",
                          cursor: "pointer",
                        }}
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link>{product.title}</Link>
                          </h3>
                          <p className="ml-4">
                            $
                            {price_Calc(
                              product.price,
                              product.discountPercentage
                            ) * quantity}
                          </p>
                        </div>
                        {/* <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p> */}
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select
                            onChange={(e) => {
                              handelQuantity(e, id);
                            }}
                            value={quantity}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </select>
                        </div>

                        <div className="">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={(e) => removeProduct(e, id)}
                          >
                            <img className="w-5 h-6" src="delete.png" alt="" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <h2 className="text-center text-white text-2xl my-5">
                  No Item Added in the cart
                </h2>

              )}


            </ul>



          </div>

        </div>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-white">
            <p>Subtotal</p>
            <p>${totalAmount()}</p>
          </div>
          <div className="flex justify-between  text-gray-400">
            <p>Total items in cart</p>
            <p>{totalItems}&nbsp;items</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-full border border-transparent bg-pink-600 px-3 py-2  text-base font-medium text-white shadow-sm hover:bg-pink-700"
            >
              <img className="w-10 h-10 mx-2" src="checkout.png" alt="" />{" "}
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to="/">
                <button
                  type="button"
                  className="font-medium mx-1 text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
