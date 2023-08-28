import React, { useEffect } from 'react'

import Navbar from '../features/Navbar/Navbar'
import { AdminProductList } from '../features/Admin/Component/AdminProductList'
import Crousal from '../Component/Crousal'
import { useDispatch } from 'react-redux'
import { FetchProductAsync } from '../features/ProductList/ProductListSlice'

const AdminPage = () => {
let dispatch = useDispatch()
  useEffect(()=>{
    let {token} = JSON.parse(localStorage.getItem("user"))
    dispatch(FetchProductAsync(token))
      },[])
  return (
    <>
        <Navbar/>
        <Crousal/>
        <AdminProductList/>
    </>
  )
}

export default AdminPage
