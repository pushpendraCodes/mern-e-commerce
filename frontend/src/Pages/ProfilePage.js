import React from "react";
import Navbar from "../features/Navbar/Navbar";
import Profile from "../features/Profile/Profile";
import Footer from "../features/common/Footer";

export default function ProfilePage() {
  return (
    <>
      <Navbar></Navbar>
      <Profile />
      <Footer/>
    </>
  );
}
