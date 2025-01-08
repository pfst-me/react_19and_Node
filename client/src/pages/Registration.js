import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const RegistrationForm = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username && formData.email && formData.password) {
      try {
        const response = await axios.post("http://localhost:8000/api/user/register", formData);
        debugger;
        setMessage(response.data.message || "Registration successful!");
      } catch (error) {
        console.error(error);
        setMessage(error.response?.data?.message || "An error occurred during registration.");
      }
    } else {
      alert('All fields are required!');
    }
  };

  // Clear form data
  const handleClear = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
    });
    setFormSubmitted(false);
  };

  return (
    <div className='container mt-5'>
      <h2 className='text-center'>Registration Form</h2>
      <form onSubmit={handleSubmit} className='p-4 shadow-sm rounded border'>
        {/* Username Field */}
        <div className='mb-3'>
          <label htmlFor='username' className='form-label'>
            Username
          </label>
          <input
            type='text'
            id='username'
            name='username'
            className='form-control'
            value={formData.username}
            onChange={handleInputChange}
            placeholder='Enter your username'
          />
        </div>

        {/* Email Field */}
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='form-control'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Enter your email'
          />
        </div>

        {/* Password Field */}
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='form-control'
            value={formData.password}
            onChange={handleInputChange}
            placeholder='Enter your password'
          />
        </div>

        {/* Submit and Clear Buttons */}
        <div className='d-flex gap-2'>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
          <button
            type='button'
            className='btn btn-secondary'
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>

      {/* Link to Login Form */}
      <div className='mt-3 text-center'>
        <p>
          Have an account already?{' '}
          <Link to='/login' className='text-primary'>
            Login here
          </Link>
        </p>
      </div>
      {/* Success Message */}
      {message && (
        <div className='alert alert-success mt-4'>
          {message}
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
