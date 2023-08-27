import React from 'react'
import { useSelector } from 'react-redux'

import { Navigate } from 'react-router-dom'

import { SelectedLoggedUser } from '../AuthSlice'
const AdminProtected = ({children}) => {
    let user = useSelector(SelectedLoggedUser)
    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    if(user && user.role!=="admin"){
        return <Navigate to='/' replace={true}></Navigate>
    }
    return children
}

export default AdminProtected
