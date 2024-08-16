import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_URL}/getuser`,
        withCredentials: true
      });

      if (response.data.success) {
        setUserData(response.data.data);
      } else {
        alert('Failed to fetch user data');
        navigate('/signin');
      }
    } catch (err) {
      alert(err.message);
      navigate('/signin');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async() => {
    try{
        const response = await axios({
            method : 'get',
            url: `${import.meta.env.VITE_API_URL}/signout`,
            withCredentials : true,
        })
        if(response.data.success){
            navigate('/signin')
        }
    }
    catch(err){
        alert(err.message)
    }
    console.log('Logout button clicked');
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-900'>
      <div className='bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
        <div className='flex flex-col items-center'>
          <img
            src='https://via.placeholder.com/150?text=User' // Replace with a real image URL if needed
            alt='User'
            className='w-24 h-24 rounded-full mb-4'
          />
          {userData ? (
            <div className='text-center'>
              <h1 className='text-2xl font-semibold mb-2'>Welcome, {userData.name}</h1>
              <p className='text-gray-400 mb-2'>Email: {userData.email}</p>
              <p className='text-gray-400 mb-4'>Bio: {userData.bio}</p>
              <button
                onClick={handleLogout}
                className='bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded'
              >
                Logout
              </button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
