import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectedProductAsync } from "../ProductListSlice";
import { SelectedProduct } from "../ProductListSlice";
import { addToCartAsync, cart } from "../../Cart/CartSlice";
import { SelectedLoggedUser } from "../../Auth/AuthSlice";
import star from "../../../icons/star.png";
import truck from "../../../icons/delivery-truck.png";
import Switch from "../../../icons/switch.png";
import guarantee from "../../../icons/guarantee.png";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { price_Calc } from "../../../app/Costant";
import { useAlert } from "react-alert";
import CartPage from "../../../Pages/CartPage";
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const spanStyle = {
    padding: "20px",
    background: "#efefef",
    color: "#000000",
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
  };

  const dispatch = useDispatch();
  const param = useParams();
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"))
    dispatch(selectedProductAsync({id,token:user.token}));
  }, [id, dispatch]);

  const product = useSelector(SelectedProduct);
  console.log(product, "products");

  //   name: "Basic Tee 6-Pack",
  //   price: "$192",
  //   href: "#",
  //   breadcrumbs: [
  //     { id: 1, name: "Men", href: "#" },
  //     { id: 2, name: "Clothing", href: "#" },
  //   ],
  //   images:
  //   [
  //     {
  //       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
  //       alt: "Two each of gray, white, and black shirts laying flat.",
  //     },
  //     {
  //       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
  //       alt: "Model wearing plain black basic tee.",
  //     },
  //     {
  //       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
  //       alt: "Model wearing plain gray basic tee.",
  //     },
  //     {
  //       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
  //       alt: "Model wearing plain white basic tee.",
  //     },
  //   ],
  //
  //   sizes: [
  //     { name: "XXS", inStock: false },
  //     { name: "XS", inStock: true },
  //     { name: "S", inStock: true },
  //     { name: "M", inStock: true },
  //     { name: "L", inStock: true },
  //     { name: "XL", inStock: true },
  //     { name: "2XL", inStock: true },
  //     { name: "3XL", inStock: true },
  //   ],
  //   description:
  //     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  //
  //   details:
  //     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
  // };

  const colors = [
    { name: "White", class: "bg-blue", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-green-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-red-900", selectedClass: "ring-gray-900" },
  ];
  const sizes = [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ];
  const details =
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.';

  const highlights = [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ];
  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();
  const user = useSelector(SelectedLoggedUser);
  const Cart = useSelector(cart);
  console.log(user);
  let navigate = useNavigate();
  let alert = useAlert();

  const addCart = (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user"))
    if  ( Cart?.findIndex((item) => item.product.id === product.id) < 0) {

      const newItem = {
        product: product.id,
        user: user.user,
        quantity: 1,
      };
      if (selectedColor) {
        newItem.color = selectedColor;
      }
      if (selectedSize) {
        newItem.size = selectedSize;
      }
      console.log(newItem)
      dispatch(addToCartAsync({ item: newItem, alert ,token:user.token}));
    } else {
      alert.error("Item Already added");
    }
  };
  const [index, setIndex] = useState(0);
  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li className="text-sm">
              <Link
                to="/"
                aria-current="page"
                className="font-medium text-gray-500 mx-4 hover:text-gray-600"
              >
                home
              </Link>
            </li>

            <li>
              <div className="flex items-center">
                <p className="mr-1 text-sm font-medium mx-2 text-gray-900">
                  {product?.category}
                </p>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="text-sm">
              <p
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product?.title}
              </p>
            </li>
          </ol>
        </nav>



        {/* desktop image gallery */}

        <div className=" hidden py-5 sm:flex justify-center items-center ">
          <div>
            {product?.images.slice(0, 4).map((item, i) => {
              return (
                <div className=" outline-dotted my-2 ">
                  <img
                    onClick={() => {
                      setIndex(i);
                    }}
                    style={{ width: "200px", height: "150px" }}
                    className="w-30 object-cover cursor-pointer h-30"
                    src={item}
                    alt={item}
                  />
                </div>
              );
            })}
          </div>
          <div className="px-10 ">
            <img style={{maxHeight:"500px"}} src={product?.images[index]} alt="" />
          </div>
        </div>

        {/* mobile image gallery */}
        <div className="slide-container  sm:hidden p-1">
          <Slide>
            {product?.images.map((slideImage, index) => (
              <div key={index}>
                <div
                  style={{ ...divStyle, backgroundImage: `url(${slideImage})` }}
                ></div>
              </div>
            ))}
          </Slide>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-6xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product?.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>

            <div className="flex gap-3">
              <p className="text-2xl font-bold tracking-tight m text-gray-900">
                ₹{price_Calc(product?.price, product?.discountPercentage)}
              </p>
              <p className="text-xl font-semibold tracking-tight line-through mt-1 text-gray-900">
                ₹{product?.price}
              </p>

              <p
                style={{ alignSelf: "center" }}
                className="text-sm align-baseline text-green-400"
              >
                {product?.discountPercentage}% off
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  <button className="rounded-md flex gap-2 bg-green-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    {product?.rating}
                    <img className="w-5 h-5" src={star} alt="" />
                  </button>
                </div>
                <p className="sr-only">{product?.rating} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <div className="divide-y mt-10 divide-gray-100">
              <ul className="flex justify-between ">
                <li>
                  <img className="w-6 h-6" src={truck} alt="" />
                  <span className="text-sm">Free Delivery</span>
                </li>
                <li>
                  <img className="w-6 h-6" src={Switch} alt="" />
                  <span className="text-sm">30 Days Replacement</span>
                </li>
                <li>
                  <img className="w-6 h-6" src={guarantee} alt="" />
                  <span className="text-sm">2 Year Warranty</span>
                </li>
              </ul>

              <div className="flex mt-5">
                <h4 className="font-semibold">Availbale: </h4>{" "}
                <p style={{ alignSelf: "center" }} className="text-sm mx-1">
                  In stock
                </p>
              </div>

              <div className="flex mt-5">
                <h4 className="font-semibold  ">Size: </h4>&nbsp;
                {sizes.map((item) => {
                  return (
                    <p
                      style={{ alignSelf: "center" }}
                      className="text-xs mx-2 "
                    >
                      {item.name} <input name="size" type="radio" />
                    </p>
                  );
                })}
              </div>
              <div className="flex mt-5">
                <h4 className="font-semibold  ">color: </h4>&nbsp;
                {colors.map((item) => {
                  return (
                    <p
                      style={{ alignSelf: "center" }}
                      className="text-xs mx-2 "
                    >
                      {item.name}{" "}
                      <input className={item.class} name="color" type="radio" />
                    </p>
                  );
                })}
              </div>
            </div>
            <br />
            <Link
              to="/cart"
              onClick={(e) => {
                addCart(e);
              }}
              className="flex mt-5 items-center justify-center rounded-full border border-transparent bg-pink-600 px-3 py-2  text-base font-medium text-white shadow-sm hover:bg-pink-700"
            >
              Add to Cart
            </Link>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {product?.description}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
