import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getCartState, getDatabaseState } from '../utils/selectors.ts';
import { loadData } from '../utils/loaders.ts';
import { useDatabase } from '../hooks/index.ts';

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
          {items.map(({
            brand, name, price, id, quantity, imageURL,
          }) => (
            <tr key={id} className="cart-item">
              <td className="cart-product-img p-3">
                <img src={imageURL} alt={name} className="mr-5"/>
              </td>
              <td className="text-start">{`${brand} ${name}`}</td>
              <td className="text-center mr-5">{price}</td>
              <td className="text-center">{quantity}</td>
            </tr>
          ))}
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
        {Object.entries(formFields).map(([fieldName, fieldValue]) => (
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
        ))}
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
  const db = useDatabase();
  const database = useSelector(getDatabaseState);

  useEffect(() => {
    loadData(db, database);
  }, []);

  return (
    <div className="cart-container">
      <div className="cart-wrapper">
        <CartOuter />
        <OrderForm />
      </div>
    </div>
  );
};
