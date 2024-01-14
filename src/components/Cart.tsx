import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getCartState } from '../utils/selectors.ts';
import { actions } from '../slices/index.ts';

import { MinusIcon } from './Icons/MinusIcon.tsx';
import { PlusIcon } from './Icons/PlusIcon.tsx';

const QuantityAdjust: React.FC<{ currentId: number }> = ({ currentId }: { currentId: number }) => {
  const dispatch = useDispatch();
  const { items } = useSelector(getCartState);
  const currentItem = items.find(({ id }) => id === currentId);

  const handleUpdate = (type: string) => {
    const payload = {
      id: currentItem?.id,
      type,
    };

    dispatch(actions.updateQuantity(payload));
  };

  return (
    <div className="counter-items m-3">
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
            <th className="p-3"/>
            <th className="text-start p-3">{t('cart.cartOuter.productCol')}</th>
            <th className="p-3 mr-5">{t('cart.cartOuter.priceCol')}</th>
            <th className="p-3">{t('cart.cartOuter.quantityCol')}</th>
          </tr>
        </thead>
        <tbody>
          {useMemo(() => items.map(({
            brand, name, price, id, imageURL,
          }) => (
            <tr key={id} className="cart-item">
              <td className="cart-product-img p-3">
                <img src={imageURL} alt={name} className="mr-5"/>
              </td>
              <td className="text-start">{`${brand} ${name}`}</td>
              <td className="text-center mr-5">{price}</td>
              <td className="text-center">
                <QuantityAdjust currentId={id} />
              </td>
            </tr>
          )), [items])}
        </tbody>
      </table>
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
      <h2 className="p-3">{t('cart.cartInfo.title')}</h2>
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

export const Cart: React.FC = () => (
  <div className="cart-container">
    <div className="cart-wrapper">
      <CartOuter />
      <OrderForm />
    </div>
  </div>
);
