import React from 'react'
import {Navigate} from "react-router-dom";

function ProtectedRoutes({children}) {
  if(localStorage.getItem("token")){
    return children
  }else{
    return <Navigate to="/" />
  }
}

export default ProtectedRoutes
