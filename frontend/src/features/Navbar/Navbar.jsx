import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cart } from "../Cart/CartSlice";
import { BsCart4 } from "react-icons/bs";
import { SelectedLoggedUser, logout } from "../Auth/AuthSlice";
import { logged_user_details } from "../user/userSlice";
import { WindowIcon } from "@heroicons/react/24/solid";

const navigation = [
  { name: "Home", href: "/", user: true },
  { name: "Products", href: "/", user: true },
  { name: "About Us", href: "/about", user: true },
  { name: "Contact Us", href: "/contact", user: true },
  { name: "Admin", href: "/admin", admin: true },
  { name: "orders", href: "/admin/orders", admin: true },
];

const category = [
  {
    label: "smartphones",
    value: "smartphones",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  },
  {
    label: "laptops",
    value: "laptops",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
  },
  {
    label: "fragrances",
    value: "fragrances",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/11/thumbnail.jpg",
  },
  {
    label: "skincare",
    value: "skincare",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/16/thumbnail.jpg",
  },
  {
    label: "groceries",
    value: "groceries",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/21/thumbnail.png",
  },
  {
    label: "home decoration",
    value: "home-decoration",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/26/thumbnail.jpg",
  },
  {
    label: "furniture",
    value: "furniture",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/31/thumbnail.jpg",
  },
  {
    label: "tops",
    value: "tops",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/36/thumbnail.jpg",
  },
  {
    label: "womens dresses",
    value: "womens-dresses",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/41/thumbnail.webp",
  },
  {
    label: "womens shoes",
    value: "womens-shoes",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/46/thumbnail.jpg",
  },
  {
    label: "mens shirts",
    value: "mens-shirts",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
  },
  {
    label: "mens shoes",
    value: "mens-shoes",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/51/thumbnail.jpg",
  },
  {
    label: "mens watches",
    value: "mens-watches",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
  },
  {
    label: "womens watches",
    value: "womens-watches",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/61/thumbnail.jpg",
  },
  {
    label: "womens bags",
    value: "womens-bags",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
  },
  {
    label: "womens jewellery",
    value: "womens-jewellery",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/16/thumbnail.jpg",
  },
  {
    label: "sunglasses",
    value: "sunglasses",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/16/thumbnail.jpg",
  },
  {
    label: "automotive",
    value: "automotive",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
  },
  {
    label: "motorcycle",
    value: "motorcycle",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/51/thumbnail.jpg",
  },
  {
    label: "lighting",
    value: "lighting",
    checked: false,
    thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Navbar({ children }) {
  let navigate = useNavigate();
  const Logout = useSelector(logout);
  let dispatch = useDispatch();
  const signOut = () => {
    dispatch(Logout);
    window.location.reload();
  };

  const user = useSelector(SelectedLoggedUser);
  // console.log(user);

  const Cart = useSelector(cart);
  return (
    <>
      {user && (
        <div className="min-h-full ">
          <Disclosure as="nav" className="">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-7xl p-2 bg-gray-900  sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="hidden lg:block">
                        <div
                          style={{ alignItems: "center" }}
                          className="ml-10 flex  space-x-6"
                        >
                          <Link
                            style={{ marginRight: "30px" }}
                            className="text-3xl mb-3 text-white "
                            to="/"
                          >
                            Apna Cart
                          </Link>
                          {user?.role === "user" && (
                            <>
                              {navigation.map((item) =>
                                item[user.role] ? (
                                  <Link
                                    key={item.name}
                                    to={item.href}
                                    className="text-white hover:bg-gray-700 hover:text-white
                                rounded-md px-3 py-2 text-sm font-medium"
                                    aria-current={
                                      item.current ? "page" : undefined
                                    }
                                  >
                                    {item.name}
                                  </Link>
                                ) : null
                              )}
                            </>
                          )}
                          {user?.role === "admin" && (
                            <>
                              <Link
                                to="/admin"
                                style={{ marginRight: "25px" }}
                                className="text-white text-sm ml-4 cursor-pointer hover:text-pink-500"
                              >
                                Admin
                              </Link>
                              <Link
                                to="/admin/orders"
                                style={{ marginRight: "25px" }}
                                className="text-white text-sm ml-4 cursor-pointer hover:text-pink-500"
                              >
                                Orders
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="hidden lg:block">
                      <div className="ml-4 flex   items-center md:ml-6">
                        <div
                          style={{ marginRight: "15PX" }}
                          className="relative "
                        >
                          <Link to="/cart">
                            <img
                              src="shopping-bag.png"
                              className="w-6 h-6"
                              alt=""
                            />
                            {Cart?.length > 0 && (
                              <span className="inline-flex cursor-pointer  cart_no items-center rounded-full text-black px-1  text-xs font-small ring-1 ring-inset">
                                {Cart.length}
                              </span>
                            )}
                          </Link>
                        </div>
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm ">
                              <span className="sr-only">Open user menu</span>
                              <img
                                style={{ borderRadius: "50%" }}
                                className="h-10 w-10 rounded-4xl "
                                src="man.png"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              style={{ width: "100px" }}
                              className="absolute right-0 z-10 mt-2  origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/profile"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block cursor-pointer px-4 py-2 text-sm text-gray-800"
                                    )}
                                  >
                                    My Profile
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to="/orders"
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block cursor-pointer px-4 py-2 text-sm text-gray-800"
                                    )}
                                  >
                                    My Orders
                                  </Link>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    onClick={signOut}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block cursor-pointer px-4 py-2 text-sm text-gray-800"
                                    )}
                                  >
                                    SignOut
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>

                    <div className=" flex w-full lg:hidden">
                      {/* Mobile menu button */}

                      <div className="flex w-full justify-between ">
                        <Link
                          style={{ marginRight: "30px" }}
                          className="text-3xl mb-3 text-white "
                          to="/"
                        >
                          Apna Cart
                        </Link>
                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="sr-only">Open main menu</span>
                          {open ? (
                            <XMarkIcon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          ) : (
                            <Bars3Icon
                              className="block h-6 w-6"
                              aria-hidden="true"
                            />
                          )}
                        </Disclosure.Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel
                  style={{ padding: "3px" }}
                  className="md:hidden "
                >
                  <div className="mt-4  border-gray-700 pb-3 pt-4">
                    <div className="flex justify-between  px-5">
                      <div className="flex">
                        <img
                          style={{ borderRadius: "50%" }}
                          className="h-10 w-10 rounded-full"
                          src="man.png"
                          alt=""
                        />
                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-white">
                            {user?.name}
                          </div>
                          <div className="text-sm font-medium leading-none text-gray-400">
                            {user?.email}
                          </div>
                        </div>
                      </div>

                      <div className="relative ">
                        <Link to="/cart">
                          <img
                            src="shopping-bag.png"
                            className="w-6 h-6"
                            navi
                            alt=""
                          />
                          {Cart?.length > 0 && (
                            <span className="inline-flex cursor-pointer font-bold cart_no items-center rounded-full text-black px-1  text-xs font-small ring-1 ring-inset">
                              {Cart?.length}
                            </span>
                          )}
                        </Link>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {/* {userNavigation.map((item) => ( */}
                      <Link
                        to="/profile"
                        className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white"
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white"
                      >
                        My Orders
                      </Link>
                      <Disclosure.Button
                        onClick={signOut}
                        className="block  cursor-pointer rounded-md px-3 py-2 text-base font-medium text-black hover:bg-gray-700 hover:text-white"
                      >
                        SignOut
                      </Disclosure.Button>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>

          <header className="bg-white shadow my-2 display ">
            <div className="mx-auto flex justify-between max-w-7xl px-2 sm:px-6 lg:px-8">
              <div class="slider1">
                <div class="slide-track-1">
                  {category.map((item, i) => {
                    return (
                      <div key={i} class="slide flex flex-col ">
                        <img
                          title={item.value}
                          style={{
                            borderRadius: "50%",
                            width: "3.5rem",
                            height: "3.5rem",
                            margin: "auto",
                            objectFit: "cover",
                            border: "2px solid pink",
                            cursor: "pointer",
                          }}
                          src={item.thumbnail}
                          alt=""
                        />
                        <h2 className="font-bold text-xs text-teal-500">
                          {item.label}
                        </h2>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </header>
        </div>
      )}
    </>
  );
}
