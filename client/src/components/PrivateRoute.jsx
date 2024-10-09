import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import SignIn from '../pages/SignIn';

export default function PrivateRoute() {
  const user = useSelector(state => state.user);
  console.log(user)
  return (
    user.currentUser ? <Outlet /> : <SignIn />
  )
}
