import React, { useState } from 'react';

const Dashboard = ({ name = '', email = '', setIsLoggedIn}) => {

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <div className='container mt-5'>
      <h2 className='text-center'>Dashboard</h2>
      <div>Name: {name}</div>
      <div>Email: {email}</div>
      <div className='d-flex mt-3'>
        <button type='button' className='btn btn-danger' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
