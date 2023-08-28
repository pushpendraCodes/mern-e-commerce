import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { Link, Navigate } from "react-router-dom";

import {
  cart,
  handelQuantityAsync,
  removeProductAsync,
} from "../features/Cart/CartSlice";

import { UpdateUserAsync } from "../features/user/userSlice";
import { CreateOrderAsync, ordersStatus } from "../features/Order/OrderSlice";
import { currentOrder } from "../features/Order/OrderSlice";
import { useNavigate } from "react-router-dom";
import { logged_user_details } from "../features/user/userSlice";
import { price_Calc } from "../app/Costant";
import Loader from "../features/common/Loader";
export function Checkout() {
  let status = useSelector(ordersStatus);

  const dispatch = useDispatch();

  let navigate = useNavigate();
  const user = useSelector(logged_user_details);
  console.log(user, "user");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      UpdateUserAsync({ ...user, addresses: [...user.addresses, data] })
    );
    reset();
  };

  const resetForm = () => {
    reset();
  };

  const [selectedAds, setAdds] = useState();
  const [pay, setpay] = useState("cash");

  const handelAds = (id) => {
    setAdds(user.addresses[id]);
  };
  const handelpay = (e) => {
    setpay(e.target.value);
  };

  let Cart = useSelector(cart);
  console.log(Cart);

  let Subtotal = 0;

  for (let i = 0; i < Cart.length; i++) {
    Subtotal += Cart[i].price * Cart[i].quantity;
  }
  let totalItems = Cart.reduce((total, item) => total + item.quantity, 0);
  let totalAmount = () => {
    let Subtotal = Cart.reduce(
      (amount, item) =>
        price_Calc(item.product.price, item.product.discountPercentage) *
          item.quantity +
        amount,
      0
    );
    return Subtotal;
  };

  const removeProduct = (e, productId) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user"))
    dispatch(removeProductAsync({productId,token:user.token}));

  };
  const handelQuantity = (e, id) => {
    let user = JSON.parse(localStorage.getItem("user"))
    dispatch(handelQuantityAsync({ quantity: +e.target.value, id: id ,token:user.token }));
  };

  const CurrentOrder = useSelector(currentOrder);
  const orderNow = () => {
    if (pay && selectedAds) {
      const order = {
        items: Cart,
        totalAmount: totalAmount(),
        totalItems,
        user: user.id,
        paymentMethod: pay,
        selectedAddress: selectedAds,
        status: "pending",
      };
      let {token} = JSON.parse(localStorage.getItem("user"))
      dispatch(CreateOrderAsync({order,token}));
    } else {
      alert("please choose address & payment mode");
    }
  };

  const [showform, setshowform] = useState(false);

  return (
    <div>
      {!Cart.length && <Navigate to="/" replace={true}></Navigate>}
      {CurrentOrder && CurrentOrder.paymentMethod === "cash" && (
        <Navigate
          to={`/order-success/${CurrentOrder.id}`}
          replace={true}
        ></Navigate>
      )}
      {CurrentOrder && CurrentOrder.paymentMethod === "card" && (
        <Navigate to={`/stripe-checkout/`} replace={true}></Navigate>
      )}
      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-5  px-10">
        <div className="lg:col-span-3 py-10 bg-white px-5 ">
          <div style={{ alignItems: "end" }} className="flex gap-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Personal Information
            </h2>
            <img className="w-5 h-5" src="project.png" alt="" />{" "}
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
          <button
            type="submit"
            className="rounded-md my-2 bg-green-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setshowform(true)}
          >
            Add Address
          </button>

          {showform && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("firstName", {
                            required: "first name is required",
                          })}
                          id="firstName"
                          className="block px-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.firstName && (
                          <p className="text-red-500">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          {...register("lastName", {
                            required: "last-name is required",
                          })}
                          type="text"
                          id="lastName"
                          className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.lastName && (
                          <p className="text-red-500">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required",
                            pattern: {
                              value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                              message: "email not valid",
                            },
                          })}
                          className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          type="number"
                          {...register("phone", {
                            required: "phone",
                          })}
                          id="phone"
                          className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street-address is required",
                          })}
                          id="street"
                          className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.street && (
                          <p className="text-red-500">
                            {errors.street.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          className="block px-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("region", {
                            required: "region is required",
                          })}
                          id="region"
                          className="block px-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.region && (
                          <p className="text-red-500">
                            {errors.region.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("postal", {
                            required: "postal-code is required",
                          })}
                          id="postal"
                          className="block w-full px-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.postal && (
                          <p className="text-red-500">
                            {errors.postal.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  onClick={resetForm}
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Reset
                </button>
                <button
                  onClick={() => {
                    setshowform(false);
                  }}
                  type="button"
                  className="rounded-md my-2 bg-red-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:red-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  close
                </button>
                <button
                  type="submit"
                  className="rounded-md my-2 bg-blue-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:blue-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  save
                </button>
              </div>
            </form>
          )}

          {user?.addresses.length > 0 && (
            <ul role="list" className="divide-y mt-5 divide-gray-100">
              <div style={{ alignItems: "end" }} className="flex gap-2">
                <h5 className=" text-xl font-semibold leading-7 text-gray-900">
                  Choose Address
                </h5>
                <img className="w-5 h-5" src="location.png" alt="" />
              </div>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose Address from existing one
              </p>
              {user?.addresses.map((address, i) => (
                <li key={i} className="flex justify-between gap-x-6 py-5 mt-3">
                  <div className="flex gap-x-4">
                    <input
                      onChange={() => {
                        handelAds(i);
                      }}
                      id="card"
                      name="address"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.firstName}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.city}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.street}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      <time>{address.postal}</time>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <fieldset className="mt-5">
            <div style={{ alignItems: "end" }} className="flex gap-2">
              <h6 className="text-xl font-semibold leading-7 text-gray-900">
                Payments Method
              </h6>
              <img className="w-6 h-6" src="secure-payment.png" alt="" />
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-600">Choose one</p>
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-x-3">
                <input
                  onChange={(e) => {
                    handelpay(e);
                  }}
                  id="card"
                  checked={pay === "card"}
                  value="card"
                  name="payments"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-everything"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  <div className="flex gap-3  ">
                    <span className="">card</span>
                    <img
                      className="w-6 h-6"
                      src="debit-card.png"
                      title="credit card icons"
                      alt=""
                    />
                  </div>
                </label>
              </div>
              <div style={{ alignItems: "end" }} className="flex  gap-x-3">
                <input
                  onChange={(e) => {
                    handelpay(e);
                  }}
                  id="cash"
                  value="cash"
                  name="payments"
                  checked={pay === "cash"}
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="push-email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  <div style={{ alignItems: "end" }} className="flex gap-3 ">
                    <span>cash</span>
                    <img
                      className="h-6 w-6"
                      title="cash icons"
                      src="money.png"
                      alt=""
                    />
                  </div>
                </label>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="lg:col-span-2">
          <div className="mx-auto  bg-white max-w-7xl  sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-5 text-center font-bold tracking-tight text-gray-900">
                Cart
              </h1>
              <div className="flow-root mt-5">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {Cart.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          style={{
                            borderRadius: "50%",
                            width: "5.5rem",
                            height: "5.5rem",
                            margin: "auto",
                            objectFit: "cover",
                            // border: "2px solid pink",
                            cursor: "pointer",
                          }}
                          src={product.product.images[0]}
                          alt={product.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link>{product.product.title}</Link>
                            </h3>
                            <p className="ml-4">
                              $
                              {price_Calc(
                                product.product.price,
                                product.product.discountPercentage
                              ) * product.quantity}
                            </p>
                          </div>
                          {/* <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p> */}
                        </div>
                        <div
                          style={{ alignItems: "center" }}
                          className="flex  flex-1 items-end justify-between   text-sm"
                        >
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty
                            </label>
                            <select
                              onChange={(e) => {
                                handelQuantity(e, product.id);
                              }}
                              value={product.quantity}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={(e) =>
                                removeProduct(e, product.product.id)
                              }
                            >
                              <img
                                className="w-5 h-6"
                                src="delete.png"
                                alt=""
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
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
                <div
                  onClick={orderNow}
                  className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  <img className="w-10 h-10 mx-3" src="order.png" alt="" />{" "}
                  {status === "loading" ? (
                    <Loader loaderColor="white" textColor="white" />
                  ) : (
                    "order Now"
                  )}
                </div>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
