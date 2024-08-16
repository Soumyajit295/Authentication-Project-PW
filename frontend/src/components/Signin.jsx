import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_URL}/signin`,
        withCredentials: true,
        data: userData
      });
      if (response.data.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      alert(err.message);
      if (err.message === "Invalid credentials") {
        navigate('/signup');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="w-2/5 p-5 bg-white shadow-md flex flex-col mt-3 rounded-lg"
        onSubmit={handleForm}
      >
        <label
          className="font-bold text-3xl text-gray-700 text-center"
          htmlFor="heading"
        >
          Instagram Signin
        </label>
        <label
          htmlFor="email"
          className="mt-5 font-semibold text-xl text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          placeholder="Enter a valid email address"
          className="border p-2 rounded-md"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          type="email"
        />
        <label
          htmlFor="password"
          className="mt-5 font-semibold text-xl text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          placeholder="Enter a strong password"
          className="border p-2 mb-5 rounded-md"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          type="password"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white w-20 mx-auto rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Sign in
        </button>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/" className="text-blue-500 hover:underline">
            Create one
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signin;
