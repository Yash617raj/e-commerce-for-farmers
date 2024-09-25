import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {

  const [signUpData, setSignUpData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    password : "",
    type : ""
  });

  const navigate = useNavigate();

  const handleFormInput = (e) => {
    if(e.target.id === "retailer" || e.target.id === "farmer") {
        setSignUpData({
          ...signUpData,
          type : e.target.id
        })
        return;
    }
    setSignUpData({
      ...signUpData,
      [e.target.id] : e.target.value
    });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/signup', {
        method : 'POST',
        headers : {
          'content-type' : 'application/json'
        },
        body : JSON.stringify(signUpData)
      });

      const data = await res.json();
      if(data.success === false) {
        console.log(data.message);
        return;
      }

      console.log(data);
      navigate('/sign-in');
    } catch (error) {
      console.log("Error while signing up you")
    }

  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-800">
      <h4 className="text-4xl font-semibold text-white mb-6">Sign Up</h4>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 bg-slate-700 border border-slate-600 rounded-lg p-6 shadow-lg">
        <div className="flex gap-4">
          <input
            type="text"
            id="firstName"
            onChange={handleFormInput}
            value={signUpData.firstName}
            placeholder="First Name"
            className="flex-1 border border-slate-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <input
            type="text"
            id="lastName"
            onChange={handleFormInput}
            value={signUpData.lastName}
            placeholder="Last Name"
            className="flex-1 border border-slate-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <input
          type="email"
          id="email"
          onChange={handleFormInput}
          value={signUpData.email}
          placeholder="Your Email"
          className="border border-slate-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="password"
          id="password"
          onChange={handleFormInput}
          value={signUpData.password}
          placeholder="Password"
          className="border border-slate-500 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <div className="flex items-center gap-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              id="farmer"
              onChange={handleFormInput}
              checked = {signUpData.type === "farmer"}
              className="h-5 w-5 text-teal-600 focus:ring-teal-500"
            />
            <span className="ml-2 text-slate-50 text-lg">Farmer</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              id="retailer"
              onChange={handleFormInput}
              checked={signUpData.type === "retailer"}
              className="h-5 w-5 text-teal-600 focus:ring-teal-500"
            />
            <span className="ml-2 text-slate-50 text-lg">Retailer/Company</span>
          </label>
        </div>
        <input
          type="submit"
          className="border rounded-lg p-3 uppercase text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
        />
      </form>
    </div>
  );
}
