import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getCartState } from '../utils/selectors.ts';

import { Logo } from './Icons/Logo.tsx';
import { HomeIcon } from './Icons/HomeIcon.tsx';
import { CartIcon } from './Icons/CartIcon.tsx';

const navItems = [
  {
    path: '/', className: 'navbar-logo', Icon: Logo, id: 1,
  },
  {
    path: '/cart', className: 'to-cart-button', Icon: CartIcon, id: 2,
  },
  {
    path: '/', className: 'to-home-button', Icon: HomeIcon, id: 3,
  },
];

export const Navbar: React.FC = () => {
  const { items } = useSelector(getCartState);
  const itemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar-container w-100">
      {navItems.map(({
        path, className, Icon, id,
      }) => (
        id === 2 && items.length ? (
          <div key={id} className={className}>
            <Link className="no-decoration" to={path}>
              <Icon />
            </Link>
            <div className="items-in-cart">
              {itemsCount}
            </div>
          </div>
        ) : (
          <div key={id} className={className}>
            <Link className="no-decoration" to={path}>
              <Icon />
            </Link>
          </div>
        )
      ))}
    </nav>
  );
};
