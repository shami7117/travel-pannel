import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Login = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLoginClick = () => {
    onLogin();
  };
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="travel.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12 flex items-center justify-center">
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>

          <form className="mt-6" >
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name=""
                id=""
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete
                required
              />
            </div>

            <div className="mt-4 relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                placeholder="Enter password"
                required
              />

              <span
                className="absolute inset-y-0 right-0 grid place-content-center px-4 mt-8 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.293 6.293a1 1 0 011.414 0L12 12.586l5.293-5.293a1 1 0 111.414 1.414L13.414 14l5.293 5.293a1 1 0 01-1.414 1.414L12 15.414l-5.293 5.293a1 1 0 01-1.414-1.414L10.586 14 5.293 8.707a1 1 0 010-1.414z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </span>
            </div>

            <button
              onClick={handleLoginClick}
              className="w-full block text-white font-semibold rounded-lg px-4 py-3 mt-6 bg-gradient-to-r from-orange-500 to-yellow-300"
            >
              Log In
            </button>

          </form>

          <hr className="my-6 border-gray-300 w-full" />
        </div>
      </div>
    </div>
  );

}

export default Login