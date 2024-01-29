import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getCartState } from '../utils/selectors.ts';
import { routes } from '../utils/routes.ts';

import { Logo } from './Icons/Logo.tsx';
import { HomeIcon } from './Icons/HomeIcon.tsx';
import { CartIcon } from './Icons/CartIcon.tsx';

const navItems = [
  {
    path: routes.mainPage(), className: 'navbar-logo', Icon: Logo, id: 1,
  },
  {
    path: routes.cartPage(), className: 'to-cart-button', Icon: CartIcon, id: 2,
  },
  {
    path: routes.mainPage(), className: 'to-home-button', Icon: HomeIcon, id: 3,
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
        <div key={id} className={className}>
          <Link className="no-decoration" to={path}>
            <Icon />
          </Link>
          {id === 2 && items.length
            ? <div className="items-in-cart">{itemsCount}</div>
            : ''}
        </div>
      ))}
    </nav>
  );
};
