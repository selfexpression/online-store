import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import classNames from 'classnames';

// import { getNavbarState } from '../utils/selectors.ts';
// import { actions } from '../slices/index.ts';

import { Logo } from './Icons/Logo.tsx';
import { HomeIcon } from './Icons/HomeIcon.tsx';
import { CartIcon } from './Icons/CartIcon.tsx';

export const Navbar: React.FC = () => {
  useEffect(() => {

  }, []);

  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        <Logo />
      </div>
      <div className="cart-link" />
      <div className="to-cart-button">
        <CartIcon />
      </div>
      <div className="to-home-button">
        <Link className="no-decoration" to='/'>
          <HomeIcon />
        </Link>
      </div>
    </nav>
  );
};
