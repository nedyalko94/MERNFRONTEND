import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

export default function PrivateRoutes({user}) {
    let auth = user
  return (
    auth ? <Outlet/> : <Navigate to="/"/>
  )
}


