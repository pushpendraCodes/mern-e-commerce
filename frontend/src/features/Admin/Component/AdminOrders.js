import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchTotalOrdersAsync,
  totalItems,
  updateOrderAsync,
} from "../../Order/OrderSlice";

import { Selectorders } from "../../Order/OrderSlice";
import { itemPerPage, price_Calc } from "../../../app/Costant";
import Pagination from "../../common/Pagination";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import { ordersStatus } from "../../Order/OrderSlice";
import Loader from "../../common/Loader";
import { ArrowLeftIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(Selectorders);
  const status = useSelector(ordersStatus);
  const totalOrders = useSelector(totalItems);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = () => {
    console.log("handleShow");
  };

  const handleOrderStatus = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    let {token} = JSON.parse(localStorage.getItem("user"))
    dispatch(updateOrderAsync({order:updatedOrder,token}));
    setEditableOrderId(-1);
  };

  const handleOrderPaymentStatus = (e, order) => {
    const updatedOrder = { ...order, paymentStatus: e.target.value };
    let {token} = JSON.parse(localStorage.getItem("user"))
    dispatch(updateOrderAsync({order:updatedOrder,token}));
    setEditableOrderId(-1);
  };



  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "received":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handelpagination = (page) => {
    console.log(page);
    setPage(page);
  };

  const handelnext = () => {
    if (page < totalOrders / itemPerPage) {
      setPage(page + 1);
    } else {
      setPage(page);
    }
  };
  // next button

  const handelprev = () => {
    if (page > 1) {
      setPage(page - 1);
    } else {
      setPage(page);
    }
  };

  useEffect(() => {
    let pagination = { _limit: itemPerPage, _page: page };
    let {token} = JSON.parse(localStorage.getItem("user"))
    dispatch(fetchTotalOrdersAsync({ pagination, sort,token }));
  }, [page, dispatch, editableOrderId, sort]);

  return (
    <>
      {/* component */}
      <div className="overflow-x-auto">
        <div className="flex justify-center items-center">
          {status === "loading" && (
            <Loader loaderColor="black" textColor="black" />
          )}
        </div>
        <Link to="/" className="flex gap-2 items-center">
          <ArrowLeftIcon className="w-5"/> &nbsp;back
        </Link>
        <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full p-5">
            <h2 className="text-lg font-bold text-center my-5">Orders</h2>
            <div className="bg-white shadow-md rounded my-6">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 px-5  text-gray-600 uppercase text-xs leading-normal">
                    <th
                      className="py-3 px-0 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order#{" "}
                      {sort._sort === "id" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                    </th>
                    <th className="py-3 px-0 text-left">Items</th>
                    <th
                      className="py-3 px-0 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Total <br/> Amount{" "}
                      {sort._sort === "totalAmount" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                    </th>
                    <th className="py-3 px-0 text-center">Shipping <br/> Address</th>
                    <th className="py-3 px-0 text-center">Order <br/> Status</th>
                    <th className="py-3 px-0 text-center">Payment<br/> Method</th>
                    <th className="py-3 px-0 text-center">Payment <br/> Status</th>
                    <th
                      className="py-3 px-0 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "createdAt",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order Time{" "}
                      {sort._sort === "createdAt" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                    </th>
                    <th
                      className="py-3 px-0 text-left cursor-pointer"
                      onClick={(e) =>
                        handleSort({
                          sort: "updatedAt",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Last Updated
                      {sort._sort === "updatedAt" &&
                        (sort._order === "asc" ? (
                          <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                        ) : (
                          <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                        ))}
                    </th>
                    <th className="py-3 px-0 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders?.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-0 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium text-xs">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-0 text-left">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.product.thumbnail}
                                alt={item.product.title}
                              />
                            </div>
                            <span>
                              {item.product.title} - #{item.quantity} - $
                              {price_Calc(item.product.price ,item.product.discountPercentage)}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          ${order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        <div className="">
                          <div>
                            <strong>{order.selectedAddress.name}</strong>,
                          </div>
                          <div>{order.selectedAddress.street},</div>
                          <div>{order.selectedAddress.city}, </div>
                          <div>{order.selectedAddress.region}, </div>
                          <div>{order.selectedAddress.postal}, </div>
                          <div>{order.selectedAddress.phone}, </div>
                        </div>
                      </td>
                      <td className="py-3 px-0 text-center">
                        {order.id === editableOrderId ? (
                          <select onChange={(e) => handleOrderStatus(e, order)}>
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          {order.paymentMethod}
                        </div>
                      </td>

                      <td className="py-3 px-0 text-center">
                        {order.id === editableOrderId ? (
                          <select
                            onChange={(e) => handleOrderPaymentStatus(e, order)}
                          >
                            <option value="pending">Pending</option>
                            <option value="received">Received</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.paymentStatus
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.paymentStatus}
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleString()
                            : null}
                        </div>
                      </td>

                      <td className="py-3 px-0 text-center">
                        <div className="flex items-center justify-center">
                          {order.updatedAt
                            ? new Date(order.updatedAt).toLocaleString()
                            : null}
                        </div>
                      </td>

                      <td className="py-3 px-0 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                            <EyeIcon
                              className="w-5 h-5"
                              onClick={(e) => handleShow(order)}
                            ></EyeIcon>
                          </div>
                          <div className="w-6  transform hover:text-purple-500 hover:scale-120">
                            <PencilIcon
                              className="w-5 h-5"
                              onClick={(e) => handleEdit(order)}
                            ></PencilIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Pagination
          handelpagination={handelpagination}
          itemPerPage={itemPerPage}
          page={page}
          totalItems={totalOrders}
          handelprev={handelprev}
          handelnext={handelnext}
        />
      </div>
    </>
  );
};

export default AdminOrders;
