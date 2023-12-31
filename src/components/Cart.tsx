import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getCartState } from '../utils/selectors.ts';

export const Cart: React.FC = () => {
  const cart = useSelector(getCartState);
  console.log(cart);
  useEffect(() => {

  }, []);

  return (
    <div></div>
  );
};
