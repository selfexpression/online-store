import React from 'react';
import { Link } from 'react-router-dom';

import { Logo } from './Icons/Logo.tsx';
import { HomeIcon } from './Icons/HomeIcon.tsx';
import { CartIcon } from './Icons/CartIcon.tsx';

const navItems = [
  {
    path: '/', className: 'navbar-brand', Icon: Logo, id: 1,
  },
  {
    path: '/cart', className: 'to-cart-button', Icon: CartIcon, id: 2,
  },
  {
    path: '/', className: 'to-home-button', Icon: HomeIcon, id: 3,
  },
];

export const Navbar: React.FC = () => (
  <nav className="navbar-container">
    {navItems.map(({
      path, className, Icon, id,
    }) => (
      <div key={id} className={className}>
        <Link className="no-decoration" to={path}>
          <Icon />
        </Link>
      </div>
    ))}
  </nav>
);
