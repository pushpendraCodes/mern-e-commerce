import React from 'react'
import { useSelector } from 'react-redux'
import { SelectedLoggedUser } from '../AuthSlice'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    let user = useSelector(SelectedLoggedUser)
    if(!user){
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return children

}

export default ProtectedRoute