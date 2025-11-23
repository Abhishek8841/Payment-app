import { useState } from 'react'
import { Navigate } from 'react-router-dom';

const Signup = ({ loggedin, setLoggedin }) => {
  if (loggedin) return (<><Navigate to="/dashboard"></Navigate></>)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
        <h2 className="text-3xl font-bold text-center mb-2">Sign Up</h2>
        <p className="text-gray-500 text-center mb-6">
          Enter your information to create an account
        </p>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
              onChange={changeHandler}
              name='firstName'
              type="text"
              id="firstName"
              placeholder="John"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <input
              onChange={changeHandler}
              name='lastName'
              type="text"
              id="lastName"
              placeholder="Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              onChange={changeHandler}
              name='email'
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
              onChange={changeHandler}
              name='password'
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            />
          </div>

          <button
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-300 font-medium"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup