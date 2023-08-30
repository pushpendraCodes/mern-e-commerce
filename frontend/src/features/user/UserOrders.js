import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrdersByUserIdAsync,

  orderStatus,


  totalOrders,
  userOrders,
} from "./userSlice";
import { SelectedLoggedUser, } from "../Auth/AuthSlice";
import { Link } from "react-router-dom";
import { price_Calc } from "../../app/Costant";
import Pagination from "../common/Pagination";
import { itemPerPage } from "../../app/Costant";
import Loader from "../common/Loader";

const UserOrders = () => {
  let dispatch = useDispatch();
  let user = useSelector(SelectedLoggedUser);
  let status = useSelector(orderStatus);
  let orders = useSelector(userOrders);
  let totalItems = useSelector(totalOrders);
  // useEffect(() => {
  //   dispatch(fetchOrdersByUserIdAsync(user.user));
  // }, [dispatch,user]);

  const [page, setpage] = useState(1);



  const handelpagination = (num) => {
    setpage(num);
  };
  const handelnext = () => {
    if (page < totalItems / itemPerPage) {
      setpage(page + 1);
    } else {
      setpage(page);
    }
  };
  // next button

  const handelprev = () => {
    if (page > 1) {
      setpage(page - 1);
    } else {
      setpage(page);
    }
  };

  useEffect(() => {
    // let {token} = JSON.parse(localStorage.getItem("user"))
    let pagination = { _limit: itemPerPage, _page: page };
    dispatch(fetchOrdersByUserIdAsync({pagination:pagination,id:user.user,token:user.token}));
  }, [dispatch, page]);

  return (
    <div>
      <div
        style={{ backgroundColor: "#032a39" }}
        className="mx-auto rounded-lg my-5   max-w-6xl px-4 sm:px-6 py-5 lg:px-8"
      >
        <h1 className="text-2xl my-5  font-bold tracking-tight text-white">
          Orders
        </h1>
        {orders.length>0 ? (
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y mb-5  divide-gray-200">
                {orders?.map((order) => (
                  <div className="gap-3">
                    <div className="flex justify-between">
                      <button className="rounded-md cursor-crosshair my-2 bg-green-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        orderId #{order.id}
                      </button>
                      <button className="rounded-md my-2 bg-red-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ">
                        {order.status}
                      </button>
                    </div>

                    {order.items.map((item, i) => {
                      return (
                        <li
                          key={i}
                          className="flex p-6 my-2 rounded-lg divide-gray-300 bg-slate-100 hover:bg-green-200"
                        >
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <Link>{item.product.title}</Link>
                                </h3>
                                <p className="ml-4">
                                  $
                                  {price_Calc(
                                    item.product.price,
                                    item.product.discountPercentage
                                  )}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty
                                </label>

                                <p>{item.quantity}</p>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                    <div className="border-t rounded-lg border-gray-200 bg-red-50 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${order.totalAmount}</p>
                      </div>
                      <div className="flex justify-between  text-gray-400">
                        <p>{order.totalItems} items</p>
                      </div>
                    </div>
                  </div>
                ))}
              </ul>

              <hr />
            </div>
          </div>
        ) : (
          <h2 className="text-center text-white">N0 Orders </h2>
        )}
        <div className="flex justify-center items-center">
          {status==="loading" && <Loader textColor="white"   />}
        </div>
      </div>

      {/* pagination */}


        <Pagination
                handelpagination={handelpagination}
                itemPerPage={itemPerPage}
                page={page}
                totalItems={totalItems}
                handelprev={handelprev}
                handelnext={handelnext}
              />

    </div>
  );
};

export default UserOrders;
