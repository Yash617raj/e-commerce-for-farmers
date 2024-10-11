import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom';
import SignIn from '../pages/SignIn';

export default function PrivateRoute() {

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.currentUser === null) navigate("/sign-in");
  },[]);
  
  return (
    user.currentUser ? <Outlet /> : <SignIn />
  )
}
