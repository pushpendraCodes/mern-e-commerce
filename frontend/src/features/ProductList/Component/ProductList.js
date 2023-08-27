import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { FetchProductAsync, productStatus } from "../ProductListSlice";
import { SelectAllProduct } from "../ProductListSlice";
import { FilterProductAsync } from "../ProductListSlice";
import Pagination from "../../common/Pagination";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { price_Calc } from "../../../app/Costant";
import Loader from "../../common/Loader";
import { SelectedLoggedUser } from "../../Auth/AuthSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ProductList() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const products = useSelector(SelectAllProduct);
  const status = useSelector(productStatus);
  let user = useSelector(SelectedLoggedUser)

  const itemPerPage = useSelector((state) => state.product.itemPerPage);
  const totalItems = useSelector((state) => state.product.totalproduct);
  console.log(products, "products");

  // filter handelchnage
  const [filter, setfilter] = useState({});
  const [sort, setsort] = useState({});

  const handelChange = (e, section, option) => {
    const Newfilter = { ...filter };
    console.log(e.target.checked);
    if (e.target.checked) {
      if (Newfilter[section.id]) {
        Newfilter[section.id].push(option.value);
        console.log(Newfilter, "Newfilter");
      } else {
        Newfilter[section.id] = [option.value];
        console.log(Newfilter, "Newfilter1");
      }
    } else {
      let index = Newfilter[section.id].findIndex((ele) => ele == option.value);
      Newfilter[section.id].splice(index, 1);
    }

    setfilter(Newfilter);
  };

  // handel sort
  const handelSort = (e, option) => {
    console.log(option);
    let NewSort = {
      _sort: option._sort,
      _order: option._order,
    };
    setsort(NewSort);
  };

  const [page, setpage] = useState(1);
  const [searchQuery, setSearch] = useState();
  // handelPagination
  const handelpagination = (page) => {
    console.log(page);
    setpage(page);
  };

  const handelSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    let pagination = { _limit: itemPerPage, _page: page };
    let search_qurey = { search: searchQuery };

    let token = user.token
    dispatch(FilterProductAsync({ filter, sort, pagination, search_qurey,token }));
  }, [dispatch, filter, sort, page, searchQuery]);

  useEffect(() => {
    setpage(1);
  }, [filter, totalItems, sort]);

  // prev button
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

  const filters = [
    {
      id: "brand",
      name: "Brand",
      options: [
        { label: "Apple", value: "Apple", checked: false },
        { label: "Samsung", value: "Samsung", checked: false },
        { label: "OPPO", value: "OPPO", checked: false },
        { label: "Huawei", value: "Huawei", checked: false },
        {
          label: "Microsoft Surface",
          value: "Microsoft Surface",
          checked: false,
        },
        { label: "Infinix", value: "Infinix", checked: false },
        { label: "HP Pavilion", value: "HP Pavilion", checked: false },
        {
          label: "Impression of Acqua Di Gio",
          value: "Impression of Acqua Di Gio",
          checked: false,
        },
        { label: "Royal_Mirage", value: "Royal_Mirage", checked: false },
        {
          label: "Fog Scent Xpressio",
          value: "Fog Scent Xpressio",
          checked: false,
        },
        { label: "Al Munakh", value: "Al Munakh", checked: false },
        { label: "Lord   Al Rehab", value: "Lord - Al-Rehab", checked: false },
        { label: "Oreal Paris", value: "Oreal Paris", checked: false },
        { label: "Hemani Tea", value: "Hemani Tea", checked: false },
        { label: "Dermive", value: "Dermive", checked: false },
        {
          label: "ROREC White Rice",
          value: "ROREC White Rice",
          checked: false,
        },
        { label: "Fair & Clear", value: "Fair & Clear", checked: false },
        { label: "Saaf & Khaas", value: "Saaf & Khaas", checked: false },
        { label: "Bake Parlor Big", value: "Bake Parlor Big", checked: false },
        {
          label: "Baking Food Items",
          value: "Baking Food Items",
          checked: false,
        },
        { label: "fauji", value: "fauji", checked: false },
        { label: "Dry Rose", value: "Dry Rose", checked: false },
        { label: "Boho Decor", value: "Boho Decor", checked: false },
        { label: "Flying Wooden", value: "Flying Wooden", checked: false },
        { label: "LED Lights", value: "LED Lights", checked: false },
        { label: "luxury palace", value: "luxury palace", checked: false },
        { label: "Golden", value: "Golden", checked: false },
        {
          label: "Furniture Bed Set",
          value: "Furniture Bed Set",
          checked: false,
        },
        { label: "Ratttan Outdoor", value: "Ratttan Outdoor", checked: false },
        { label: "Kitchen Shelf", value: "Kitchen Shelf", checked: false },
        { label: "Multi Purpose", value: "Multi Purpose", checked: false },
        { label: "AmnaMart", value: "AmnaMart", checked: false },
        {
          label: "Professional Wear",
          value: "Professional Wear",
          checked: false,
        },
        { label: "Soft Cotton", value: "Soft Cotton", checked: false },
        { label: "Top Sweater", value: "Top Sweater", checked: false },
        {
          label: "RED MICKY MOUSE..",
          value: "RED MICKY MOUSE..",
          checked: false,
        },
        { label: "Digital Printed", value: "Digital Printed", checked: false },
        { label: "Ghazi Fabric", value: "Ghazi Fabric", checked: false },
        { label: "IELGY", value: "IELGY", checked: false },
        { label: "IELGY fashion", value: "IELGY fashion", checked: false },
        {
          label: "Synthetic Leather",
          value: "Synthetic Leather",
          checked: false,
        },
        {
          label: "Sandals Flip Flops",
          value: "Sandals Flip Flops",
          checked: false,
        },
        { label: "Maasai Sandals", value: "Maasai Sandals", checked: false },
        {
          label: "Arrivals Genuine",
          value: "Arrivals Genuine",
          checked: false,
        },
        { label: "Vintage Apparel", value: "Vintage Apparel", checked: false },
        { label: "FREE FIRE", value: "FREE FIRE", checked: false },
        { label: "The Warehouse", value: "The Warehouse", checked: false },
        { label: "Sneakers", value: "Sneakers", checked: false },
        { label: "Rubber", value: "Rubber", checked: false },
        { label: "Naviforce", value: "Naviforce", checked: false },
        { label: "SKMEI 9117", value: "SKMEI 9117", checked: false },
        { label: "Strap Skeleton", value: "Strap Skeleton", checked: false },
        { label: "Stainless", value: "Stainless", checked: false },
        { label: "Eastern Watches", value: "Eastern Watches", checked: false },
        { label: "Luxury Digital", value: "Luxury Digital", checked: false },
        { label: "Watch Pearls", value: "Watch Pearls", checked: false },
        { label: "Bracelet", value: "Bracelet", checked: false },
        { label: "LouisWill", value: "LouisWill", checked: false },
        { label: "Copenhagen Luxe", value: "Copenhagen Luxe", checked: false },
        { label: "Steal Frame", value: "Steal Frame", checked: false },
        { label: "Darojay", value: "Darojay", checked: false },
        {
          label: "Fashion Jewellery",
          value: "Fashion Jewellery",
          checked: false,
        },
        { label: "Cuff Butterfly", value: "Cuff Butterfly", checked: false },
        {
          label: "Designer Sun Glasses",
          value: "Designer Sun Glasses",
          checked: false,
        },
        { label: "mastar watch", value: "mastar watch", checked: false },
        { label: "Car Aux", value: "Car Aux", checked: false },
        { label: "W1209 DC12V", value: "W1209 DC12V", checked: false },
        { label: "TC Reusable", value: "TC Reusable", checked: false },
        { label: "Neon LED Light", value: "Neon LED Light", checked: false },
        {
          label: "METRO 70cc Motorcycle   MR70",
          value: "METRO 70cc Motorcycle - MR70",
          checked: false,
        },
        { label: "BRAVE BULL", value: "BRAVE BULL", checked: false },
        { label: "shock absorber", value: "shock absorber", checked: false },
        { label: "JIEPOLLY", value: "JIEPOLLY", checked: false },
        { label: "Xiangle", value: "Xiangle", checked: false },
        {
          label: "lightingbrilliance",
          value: "lightingbrilliance",
          checked: false,
        },
        { label: "Ifei Home", value: "Ifei Home", checked: false },
        { label: "DADAWU", value: "DADAWU", checked: false },
        { label: "YIOSI", value: "YIOSI", checked: false },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        {
          label: "smartphones",
          value: "smartphones",
          checked: false,
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
        },
        {
          label: "laptops",
          value: "laptops",
          checked: false,
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
        },
        {
          label: "fragrances",
          value: "fragrances",
          checked: false,
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
        },
        {
          label: "skincare",
          value: "skincare",
          checked: false,
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
        },
        {
          label: "groceries",
          value: "groceries",
          checked: false,
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
        },
        {
          label: "home decoration",
          value: "home-decoration",
          checked: false,
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
        },
        {
          label: "furniture",
          value: "furniture",
          checked: false,
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
        },
        {
          label: "tops",
          value: "tops",
          checked: false,
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
        },
        {
          label: "womens dresses",
          value: "womens-dresses",
          checked: false,
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
        },
        {
          label: "womens shoes",
          value: "womens-shoes",
          checked: false,
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
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
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
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
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
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
        },
        {
          label: "sunglasses",
          value: "sunglasses",
          checked: false,
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
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
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
        },
        {
          label: "lighting",
          value: "lighting",
          checked: false,
          thumbnail: "https://i.dummyjson.com/data/products/98/thumbnail.jpg",
        },
      ],
    },
  ];
  const sortOptions = [
    {
      id: "rating",
      name: "Best Rating",
      _sort: "rating",
      _order: "desc",
      current: false,
    },

    {
      id: "price",
      name: "Price: Low to High",
      _order: "asc",
      _sort: "price",
      current: false,
    },
    {
      id: "price",
      name: "Price: High to Low",
      _order: "desc",
      _sort: "price",
      current: false,
    },
  ];

  return (
    <div>
      <div className="bg-white my-4 ">
        <div>
          {/* Mobile filter dialog */}

          <MobileFilter
            mobileFiltersOpen={mobileFiltersOpen}
            Fragment={Fragment}
            setMobileFiltersOpen={setMobileFiltersOpen}
            filters={filters}
            handelChange={handelChange}
          ></MobileFilter>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-2">
              <h1 className=" hidden lg:text-2xl  lg:font-bold lg:tracking-tight lg:text-gray-900">
                Product List
              </h1>

              <form>
                <label
                  for="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="search"
                    id="default-search"
                    class="block w-52 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:border-white"
                    placeholder="Search "
                    onChange={handelSearch}
                  />
                </div>
              </form>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item key={option.name}>
                            {({ active }) => (
                              <p
                                onClick={(e) => {
                                  handelSort(e, option);
                                }}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </p>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* DeskstopFilters */}

                <DesktopFilter
                  filters={filters}
                  filter={filter}
                  handelChange={handelChange}
                />
                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* product List start here */}
                  <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
                      {status === "loading" ? (
                        <Loader loaderColor="black" textColor="black" />
                      ) : (
                        <ProductGrid products={products} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <Pagination
              handelpagination={handelpagination}
              itemPerPage={itemPerPage}
              page={page}
              totalItems={totalItems}
              handelprev={handelprev}
              handelnext={handelnext}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

function MobileFilter({
  mobileFiltersOpen,
  handelChange,
  Fragment,
  setMobileFiltersOpen,
  filters,
}) {
  return (
    <Transition.Root show={mobileFiltersOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={setMobileFiltersOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setMobileFiltersOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4 border-t border-gray-200">
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  onChange={(e) => {
                                    handelChange(e, section, option);
                                  }}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
const DesktopFilter = ({ filters, handelChange, filter }) => {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        onChange={(e) => {
                          handelChange(e, section, option);
                        }}
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
};

const ProductGrid = ({ products }) => {
  let navigate = useNavigate();
  return (
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {products?.map((product) => (
        <div key={product.id} className="group relative">
          <Link to={`/product-details/${product.id}`}>
            <div className="  w-full overflow-hidden border-2 border-gray-300 p-3 rounded-md bg-gray-200 lg:aspect-none  max-w-xs transition duration-300 ease-in-out group-hover:scale-110   lg:h-80 ">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full  "
              />
            </div>
          </Link>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <Link to={`/product-details/${product.id}`}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                <StarIcon className="w-5 h-5 inline mx-1" />
                <span className="align-bottom">{product.rating}</span>
              </p>
            </div>

            <p className="text-sm font-medium line-through text-gray-400">
              ${product.price}
            </p>
            <p className="text-sm mx-2 font-medium text-gray-900">
              ₹{price_Calc(product.price, product.discountPercentage)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
