import React from "react";
import Navbar from "../features/Navbar/Navbar";
import { ProductList } from "../features/ProductList/Component/ProductList";
import Crousal from "../Component/Crousal";
import Footer from "../features/common/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Crousal />
      <ProductList />
      <Footer/>
    </>
  );
}
