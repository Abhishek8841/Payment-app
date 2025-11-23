import React, { useContext, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Signin = ({ loggedin, setLoggedin }) => {
  if (loggedin) return (<><Navigate to="/dashboard"></Navigate></>)
  const { userDetails, SetUserDetails } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  function changeHandler(event) {
    const { value, name } = event.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  function submitHandler() {

  }

  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2">Sign In</h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your credentials to access your account
        </p>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              name='email'
              onChange={changeHandler}
              type="email"
              id="email"
              placeholder="johndoe@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              name='password'
              onChange={changeHandler}
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <button
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 font-medium"
          >
            Sign In
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button onClick={() => { navigate('/signup') }} className="font-medium text-black hover:underline">
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>);
}

export default Signin