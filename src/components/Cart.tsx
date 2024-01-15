import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getCartState } from '../utils/selectors.ts';
import { useDatabase, useAuth } from '../hooks/index.ts';
import { updateCart } from '../thunks/cartThunks.ts';
import type { AppDispatch } from '../types/aliases.ts';
import cartImage from '../assets/images/cart-image.png';

import { MinusIcon } from './Icons/MinusIcon.tsx';
import { PlusIcon } from './Icons/PlusIcon.tsx';

const QuantityAdjust: React.FC<{ currentId: number }> = ({ currentId }: { currentId: number }) => {
  const currentUserUID = useAuth();
  const db = useDatabase();
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector(getCartState);
  const currentItem = items.find(({ id }) => id === currentId);

  const handleUpdate = (type: string) => {
    const payload = {
      userUID: currentUserUID,
      db,
      id: currentItem?.id as number,
      type,
    };

    dispatch(updateCart(payload));
  };

  return (
    <div className="counter-items m-2">
      <button
        type="button"
        aria-label="decrement"
        onClick={() => handleUpdate('decrement')}
      >
        <MinusIcon />
      </button>
      <span className="p-4">{currentItem?.quantity}</span>
      <button
        type="button"
        aria-label="increment"
        onClick={() => handleUpdate('increment')}
      >
        <PlusIcon />
      </button>
    </div>
  );
};

const CartOuter: React.FC = () => {
  const { t } = useTranslation();
  const { items } = useSelector(getCartState);

  return (
    <div className="cart-outer">
      <h2 className="p-3">{t('cart.cartOuter.title')}</h2>
      <table className="mt-4">
        <thead>
          <tr>
            <th />
            <th className="item-name text-start p-3">{t('cart.cartOuter.productCol')}</th>
            <th className="item-price p-3 mr-5">{t('cart.cartOuter.priceCol')}</th>
            <th className="item-quantity p-3">{t('cart.cartOuter.quantityCol')}</th>
          </tr>
        </thead>
        <tbody>
          {useMemo(() => items.map(({
            brand, name, price, id, imageURL,
          }) => (
            <tr key={id} className="cart-item">
              <td className="cart-product-img p-3">
                <img src={imageURL} alt={name} className="mr-5"/>
                <div className="small-table">
                  <div className="aqua-color p-2">
                    <span>{`${brand} ${name}`}</span>
                  </div>
                  <div className="p-2 aqua-color">{`${price}₽`}</div>
                </div>
              </td>
              <td className="item-name text-start aqua-color">{`${brand} ${name}`}</td>
              <td className="item-price text-center mr-5">{`${price}₽`}</td>
              <td className="text-center">
                <QuantityAdjust currentId={id} />
              </td>
            </tr>
          )), [items])}
        </tbody>
      </table>
      <Link className="d-block mt-5" to={'/'}>{t('cart.continueShopping')}</Link>
    </div>
  );
};

const OrderForm: React.FC = () => {
  const { t } = useTranslation();

  const formFields = {
    name: t('cart.formFields.name'),
    surname: t('cart.formFields.surname'),
    phoneNumber: t('cart.formFields.phoneNumber'),
  };

  return (
    <div className="order-form">
      <h2 className="p-3">{t('cart.orderForm.title')}</h2>
      <form>
        {useMemo(() => Object.entries(formFields).map(([fieldName, fieldValue]) => (
          <div key={fieldName} className="m-3">
            <input
              type="text"
              id={fieldName}
              name={fieldName}
              placeholder={fieldValue}
              className="form-field p-2 rounded-2"
            />
            <label htmlFor={fieldName}></label>
          </div>
        )), [formFields])}
        <button
          type="submit"
          aria-label="submit-btn"
          className="submit-btn m-3"
        >
          {t('cart.submitButton')}
        </button>
      </form>
    </div>
  );
};

export const Cart: React.FC = () => {
  const { t } = useTranslation();
  const { items } = useSelector(getCartState);

  return (
    !items.length
      ? <div className="cart-container align-items-center vh-100">
        <div className="empty-cart-items">
          <img src={cartImage} alt="cart" className="empty-cart-image" />
          <span>{`${t('cart.emptyCart')} `}</span>
          <Link to={'/'}>{t('cart.continueShopping')}</Link>
        </div>
      </div>
      : <div className="cart-container">
        <div className="cart-wrapper">
          <CartOuter />
          <OrderForm />
        </div>
      </div>
  );
};
