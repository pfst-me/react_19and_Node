import React from 'react';

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav class='navbar navbar-light' style={{ backgroundColor: '#e3f2fd' }}>
      <div class='container-fluid'>
        <a class='navbar-brand' href='#'>
          <img
            src='https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg'
            alt=''
            width='30'
            height='24'
            class='d-inline-block align-text-top'
          />
          Bootstrap
        </a>
        <i class='bi bi-person-circle'></i>
      </div>
    </nav>
  );
};

export default Navbar;
