import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import { SelectedLoggedUser } from "../Auth/AuthSlice";
import { UpdateUserAsync, logged_user_details } from "../user/userSlice";
import { useAlert } from "react-alert";

export default function Profile() {
  const [selctedEditIndex, setselectededitform] = useState(-1);
  const [showAddForm, setshowAddForm] = useState(false);
  const dispatch = useDispatch();
let alert = useAlert()
  const user = useSelector(logged_user_details);
  const {

    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    let {token} = JSON.parse(localStorage.getItem("user"))
    let newAds = {...user ,addresses:[...user.addresses]}
    newAds.addresses.splice(selctedEditIndex, 1, data);
    dispatch(UpdateUserAsync({newAds,token }));
    reset();
    setselectededitform(-1);
    alert.success("address updated ")
  };


  const addform = () => {
    setshowAddForm(true);
  };
  const addSubmit = (data) => {

    let {token} = JSON.parse(localStorage.getItem("user"))
    let newAds = {...user ,addresses:[...user.addresses,data]}
    dispatch(
      UpdateUserAsync({newAds,token })
    );
    reset();
    setshowAddForm(false);
    alert.success("address added ")
  };

  const showEditForm = (address, index) => {
    setselectededitform(index);
    setValue("firstName", address.firstName);
    setValue("lastName", address.lastName);
    setValue("city", address.city);
    setValue("street", address.street);
    setValue("postal", address.postal);
    setValue("region", address.region);
    setValue("phone", address.phone);
    setValue("email", address.email);
  };

  const cancel = () => {
    setselectededitform(-1);
  };
  const cancel1 = () => {
    setshowAddForm(false);
  };


  const handelRemove = (index) => {
    let {token} = JSON.parse(localStorage.getItem("user"))
    let newAds = {...user ,addresses:[...user.addresses]}
    newAds.addresses.splice(index ,1 )
    dispatch(UpdateUserAsync({newAds,token}))
    alert.success("address removed ")

  };
  return (
    <div>
      <div style={{backgroundColor:"#032a39"}} className="lg:col-span-3 py-10  px-5 ">
        <div className="mx-auto rounded-xl py-5  bg-white max-w-5xl px-4 sm:px-6 lg:px-8">
        <h3  className="text-sm text-red-500 float-right">  {user?.role}</h3>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <button
            type="submit"
            className="rounded-md my-2 bg-green-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => addform()}
          >
            Add Address
          </button>
          <ul role="list" className="divide-y mt-5 divide-gray-100">


            {showAddForm && (
              <form onSubmit={handleSubmit(addSubmit)}>
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
                            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                            className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.email && (
                            <p className="text-red-500">
                              {errors.email.message}
                            </p>
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
                            type="tel"
                            {...register("phone", {
                              required: "phone",
                            })}
                            id="phone"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.phone && (
                            <p className="text-red-500">
                              {errors.phone.message}
                            </p>
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                          {errors.city && (
                            <p className="text-red-500">
                              {errors.city.message}
                            </p>
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  <button onClick={cancel1} className="">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}

            {user?.addresses.map((address, i) => (
              <>
                <li
                  key={i}
                  className="flex p-3 justify-between rounded-md gap-x-6 py-5 mt-3 bg-slate-200"
                >
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <div className="flex gap-2">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.firstName}
                        </p>
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.lastName}
                        </p>
                      </div>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.email}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.city}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div>
                      <button
                        type="submit"
                        className="rounded-md mx-2 bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => showEditForm(address, i)}
                      >
                        Edit
                      </button>
                      <button
                        className="rounded-md bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handelRemove}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {address.street}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      <time>{address.postal}</time>
                    </p>
                  </div>
                </li>
                {selctedEditIndex === i && (
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
                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.email && (
                                <p className="text-red-500">
                                  {errors.email.message}
                                </p>
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
                                type="tel"
                                {...register("phone", {
                                  required: "phone",
                                })}
                                id="phone"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.phone && (
                                <p className="text-red-500">
                                  {errors.phone.message}
                                </p>
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                              {errors.city && (
                                <p className="text-red-500">
                                  {errors.city.message}
                                </p>
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                      <button onClick={cancel} className="">
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                )}
              </>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
