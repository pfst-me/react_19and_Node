import React, { useState, useCallback } from 'react';
import axios from 'axios';

const Dashboard = ({ name = '', email = '', setIsLoggedIn}) => {
  const [message, setMessage] = useState('')
  const [data, setData] = useState(null)

  console.log('data->', data);
  

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const handleClear = () => {
    setData(null)
  }

  const handleGetUsers = async () => {
    setData(null)
    try {
      setMessage('')
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:8000/api/user/getUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.users)
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "An error occurred while fetching data.");
    }
  }

  const handleGetUsersWithRefreshToken = async () => {
    setData(null)
    try {
      setMessage('')
      const response = await axios.get("http://localhost:8000/api/user/getUsersRefreshToken", {
        withCredentials: true // // This ensures cookies are sent
      });
      setData(response.data.users)
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || "An error occurred while fetching data.");
    }
  }

  const renderUsers = useCallback(() => {
    return data.map((user, index) => (
      <div key={index} className="border p-3 mb-2">
        <div><strong>Username:</strong> {user.username}</div>
        <div><strong>Email:</strong> {user.email}</div>
      </div>
    ));
  }, [data]);

  return (
    <div className="container mt-5">
      <h2 className="text-center">Dashboard</h2>

      {message && <div className="alert alert-danger">{message}</div>}

      {data && data.length > 0 ? (
        <div className="mt-3">
          <h4 className="mb-3">Users List:</h4>
          {renderUsers()}
        </div>
      ) : (
        <p className="mt-3">No users found. Click "Get Users" to fetch data.</p>
      )}

      <div className="d-flex mt-3 gap-3">
        <button type="button" className="btn btn-primary" onClick={handleGetUsers}>
          Get Users
        </button>
        <button type="button" className="btn btn-primary" onClick={handleGetUsersWithRefreshToken}>
          Get Users with Refresh token
        </button>
        <button type="button" className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleClear} disabled={!data}>
          Clear data
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
