import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
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
        url: `${import.meta.env.VITE_API_URL}/signup`,
        withCredentials: true,
        data: userData,
      });
      if (response.data.success) {
        navigate('/signin');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form
      className="w-2/5 p-5 mx-auto bg-slate-50 shadow-md flex flex-col mt-3 rounded-lg"
      onSubmit={handleForm}
    >
      <label
        className="font-bold text-3xl text-slate-600 text-center"
        htmlFor="heading"
      >
        Instagram Signup
      </label>
      <label
        htmlFor="name"
        className="mt-5 font-semibold text-xl text-slate-600 mb-2"
      >
        Name
      </label>
      <input
        placeholder="Enter your name"
        className="border p-2 rounded-md"
        name="name"
        value={userData.name}
        onChange={handleInputChange}
        type="text"
      />
      <label
        htmlFor="email"
        className="mt-5 font-semibold text-xl text-slate-600 mb-2"
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
        className="mt-5 font-semibold text-xl text-slate-600 mb-2"
      >
        Password
      </label>
      <input
        placeholder="Enter a strong password"
        className="border p-2 rounded-md"
        name="password"
        value={userData.password}
        onChange={handleInputChange}
        type="password"
      />
      <label
        htmlFor="bio"
        className="mt-5 font-semibold text-xl text-slate-600 mb-2"
      >
        Bio
      </label>
      <textarea
        placeholder="Your bio"
        className="border p-2 mb-5 rounded-md"
        name="bio"
        value={userData.bio}
        onChange={handleInputChange}
        cols={5}
        rows={5}
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white w-20 mx-auto rounded-md hover:bg-blue-600 cursor-pointer"
      >
        Sign up
      </button>
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{' '}
        <a href="/signin" className="text-blue-500 hover:underline">
          Sign in
        </a>
      </p>
    </form>
  );
}

export default Signup;
