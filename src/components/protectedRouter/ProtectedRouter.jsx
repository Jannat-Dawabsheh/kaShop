import React from 'react'
import { Navigate } from 'react-router';

export default function ProtectedRouter({children}) {
  const token=localStorage.getItem("userToken");
  if(!token){
    return <Navigate to={'/login'}></Navigate>;
  }
  return children
}
