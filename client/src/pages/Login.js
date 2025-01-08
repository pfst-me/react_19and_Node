import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  // Load saved email from localStorage when the component mounts
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setFormData((prevState) => ({
        ...prevState,
        email: savedEmail,
        rememberMe: true,
      }));
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    // e.preventDefault();

    if (formData.email && formData.password) {
      console.log('Login Submitted:', formData);

      // Save or remove the email based on the Remember Me checkbox
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      alert('Login successful!');
      navigate('/dashboard');
      setIsLoggedIn(true)
      
    } else {
      alert('Please fill in both email and password.');
    }
  };

  // Handle form reset (Clear button)
  const handleClear = () => {
    setFormData({
      email: '',
      password: '',
      rememberMe: false,
    });
    localStorage.removeItem('rememberedEmail');
  };

  return (
    <div className='container mt-5'>
      <h2 className='text-center'>Login</h2>
      <form action={handleSubmit} className='p-4 shadow-sm rounded border'>
        {/* Email Input */}
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
            required
          />
        </div>

        {/* Password Input */}
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
            required
          />
        </div>

        {/* Remember Me Checkbox */}
        <div className='form-check mb-3'>
          <input
            type='checkbox'
            id='rememberMe'
            name='rememberMe'
            className='form-check-input'
            checked={formData.rememberMe}
            onChange={handleInputChange}
          />
          <label htmlFor='rememberMe' className='form-check-label'>
            Remember Me
          </label>
        </div>

        {/* Submit and Clear Buttons */}
        <div className='d-flex gap-2'>
          <button type='submit' className='btn btn-primary w-45'>
            Login
          </button>
          <button
            type='button'
            className='btn btn-secondary w-45'
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>

      {/* Link to Registration Form */}
      <div className='mt-3 text-center'>
        <p>
          Don't have an account?{' '}
          <Link to='/register' className='text-primary'>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;