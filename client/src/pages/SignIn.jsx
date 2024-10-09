import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

export default function SignIn() {

  const [signInFormData, setSignInFormData] = useState({
    email : "",
    password : "",
    type : ""
  });

  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleInputFieldChange = (e) => {
    setError("");
    if(e.target.id === "farmer" || e.target.id === 'retailer') {
      setSignInFormData({
        ...signInFormData,
        type : e.target.id
      })  
      return;
    }

    setSignInFormData({
      ...signInFormData,
      [e.target.id] : e.target.value
    })
  }

  const handleSignInFormData = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(signInFormData),
      });

      const data = await res.json();

      if(data.success === false) {
        setError(data.message);
        return;
      }

      dispatch(signInSuccess(data));
      console.log(data);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  }


  return (
    <div className="flex flex-col bg-slate-800 items-center justify-center h-screen">
      <h2 className="text-3xl text-white font-semibold mb-6">Sign In</h2>
      <div className="border border-slate-600 rounded-lg p-6 bg-slate-700 shadow-lg w-11/12 sm:w-3/4 md:w-1/3 lg:w-1/4">
        <form onSubmit={handleSignInFormData} className="flex flex-col gap-4">
          <input
            type="email"
            id="email"
            onChange={handleInputFieldChange}
            value={signInFormData.email}
            className="rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Email"
            required
          />
          <input
            type="password"
            id="password"
            onChange={handleInputFieldChange}
            value={signInFormData.password}
            className="rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Password"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <label className="flex items-center">
              <input 
              type="checkbox" 
              id="farmer"
              onChange={handleInputFieldChange}
              checked={signInFormData.type === 'farmer'}
              className="h-5 w-5" 
              />
              <span className="ml-2 text-white font-semibold text-lg">Farmer</span>
            </label>
            <label className="flex items-center">
              <input
               type="checkbox" 
               id="retailer"
               onChange={handleInputFieldChange}
               checked={signInFormData.type === 'retailer'}
               className="h-5 w-5" 
               />
              <span className="ml-2 text-white font-semibold text-lg">
                Retailer/Company
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="border rounded-lg p-3 bg-teal-600 text-white hover:bg-teal-700 transition duration-200"
          >
            Sign In
          </button>
        </form>
        {
          error && <p className="text-red-200 p-3 text-sm"><span className="text-white text-sm">Error : </span>{error}</p>
        }
      </div>
    </div>
  );
}
