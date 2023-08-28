import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateProductAsync,
  SelectAllProduct,
  fetchBrand,
  fetchCategory,
  selectAllCategory,
  SelectedProduct,
  selectAllbrands,
  selectedProductAsync,
  updateProductAsync,
} from "../../ProductList/ProductListSlice";
import { useAlert } from "react-alert";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { productStatus } from "../../ProductList/ProductListSlice";
import Loader from "../../common/Loader";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function ProductForm() {
  let dispatch = useDispatch();
  let alert = useAlert();


  const param = useParams();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();


  useEffect(() => {
 dispatch(fetchBrand());
   dispatch(fetchCategory());
  }, []);

  useEffect(() => {
    if (param.id) {
      console.log(param.id);
      let user = JSON.parse(localStorage.getItem("user"))
      dispatch(selectedProductAsync({id:param.id,token:user.token}));

    }
  }, [param.id]);

  const selectedproduct = useSelector(SelectedProduct);
  const status = useSelector(productStatus);

  useEffect(() => {
    if (selectedproduct && param.id) {
      setValue("title", selectedproduct.title);
      setValue("description", selectedproduct.description);
      setValue("price", selectedproduct.price);
      setValue("discountPercentage", selectedproduct.discountPercentage);
      setValue("thumbnail", selectedproduct.thumbnail);
      setValue("stock", selectedproduct.stock);
      setValue("image1", selectedproduct.images[0]);
      setValue("image2", selectedproduct.images[1]);
      setValue("image3", selectedproduct.images[2]);
      setValue("brand", selectedproduct.brand);
      setValue("category", selectedproduct.category);
    }
  }, [selectedproduct, param.id]);

  const onSubmit = (data) => {
    const product = { ...data };
    product.images = [product.image1, product.image2, product.image3];
    delete product.image1;
    delete product.image2;
    delete product.image3;
    product.stock = +product.stock;
    product.price = +product.price;
    product.rating = 4.5;
    product.discountPercentage = +product.discountPercentage;
    console.log(product, "product");
    let user = JSON.parse(localStorage.getItem("user"))
    if (param.id) {
      product.id = param.id;
      product.rating = selectedproduct.rating || 0;
      dispatch(updateProductAsync({product,token:user.token}));
      reset();
      alert.success("product updated");
      //TODO: on product successfully added clear fields and show a message
    } else {
      dispatch(CreateProductAsync({product,token:user.token}));
      reset();
      alert.success("product created");
    }
  };

  // deleted product
  const handleDelete = () => {
    const product = { ...selectedproduct };
    product.deleted = true;
    dispatch(updateProductAsync(product));
  };
  const brands = useSelector(selectAllbrands);
  const category = useSelector(selectAllCategory);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12 p-6  max-w-7xl">
        <div className="border-b border-gray-900/10 pb-12 ">
        <Link to="/admin" className="text-sm flex mb-5 items-center gap-5 font-semibold leading-6 text-gray-900">
         <ArrowLeftIcon className="w-8" />back home
        </Link>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Add Product
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    workcation.com/
                  </span>
                  <input
                    type="text"
                    {...register("title", {
                      required: "title is required",
                    })}
                    name="title"
                    id="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Iphone"
                  />
                </div>
                {errors.title && (
                  <p className="text-red-500 text-xs">{errors.title.message}</p>
                )}
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="Description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  {...register("description", {
                    required: "description is required",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  {...register("price", {
                    required: "price is required",
                  })}
                  min={1}
                  max={1000}
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.price && (
                  <p className="text-red-500 text-xs">{errors.price.message}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="Stock"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Stock
              </label>
              <div className="mt-2">
                <input
                  {...register("stock", {
                    required: "stock is required",
                  })}
                  min={1}
                  max={1000}
                  type="number"
                  name="stock"
                  id="stock"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.stock && (
                  <p className="text-red-500 text-xs">{errors.stock.message}</p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                discountPercentage
              </label>
              <div className="mt-2">
                <input
                  {...register("discountPercentage", {
                    required: "discountPercentage is required",
                  })}
                  type="text"
                  name="discountPercentage"
                  id="discountPercentage"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.discountPercentage && (
                  <p className="text-red-500 text-xs">
                    {errors.discountPercentage.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Brand
              </label>
              <div className="mt-2">
                <select
                  id="brand"
                  name="brand"
                  {...register("brand", {
                    required: "brand is required",
                  })}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">....choose Brand..</option>
                  {brands?.map((item) => (
                    <option name="brand" value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                {errors.brand && (
                  <p className="text-red-500 text-xs">{errors.brand.message}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <select
                  {...register("category", {
                    required: "category is required",
                  })}
                  id="category"
                  name="category"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">----choose Category----</option>
                  {category.map((item) => (
                    <option value={item.value}>{item.label}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="thumbnail"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                thumbnail
              </label>
              <div className="mt-2">
                <input
                  {...register("thumbnail", {
                    required: "thumbnail is required",
                  })}
                  type="text"
                  name="thumbnail"
                  id="thumbnail"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.thumbnail && (
                  <p className="text-red-500 text-xs">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="image1"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                image1
              </label>
              <div className="mt-2">
                <input
                  {...register("image1", {
                    required: "image1 is required",
                  })}
                  type="text"
                  name="image1"
                  id="image1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.image1 && (
                  <p className="text-red-500 text-xs">
                    {errors.image1.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="image2"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                image2
              </label>
              <div className="mt-2">
                <input
                  {...register("image2", {
                    required: "image2 is required",
                  })}
                  type="text"
                  name="image2"
                  id="image2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.image2 && (
                  <p className="text-red-500 text-xs">
                    {errors.image2.message}
                  </p>
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="image3"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                image3
              </label>
              <div className="mt-2">
                <input
                  {...register("image3", {
                    required: "image3 is required",
                  })}
                  type="text"
                  name="image3"
                  id="image3"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.image2 && (
                  <p className="text-red-500 text-xs">
                    {errors.image2.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-5 flex items-center justify-end gap-x-6">


        {!selectedproduct?.deleted && (
          <button
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline-indigo-600"
          >
            Delete
          </button>
        )}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-indigo-600"
        >
          {status === "loading" ? (
            <Loader loaderColor="white" textColor="white" />
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );
}
