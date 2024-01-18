import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import type { TFunction } from 'i18next';
import { PatternFormat } from 'react-number-format';

import { getCartState } from '../utils/selectors.ts';
import { useDatabase, useAuth } from '../hooks/index.ts';
import { updateCart } from '../thunks/cartThunks.ts';
import type { AppDispatch } from '../types/aliases.ts';
import cartImage from '../assets/images/cart-image.png';
import { formatMessage, createOrderMessage } from '../utils/helpers.ts';
import { actions } from '../slices/index.ts';

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
  const { items, totalAmount } = useSelector(getCartState);

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
              <td className="cart-product-img p-2">
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
      <div className="d-flex align-items-center justify-content-between">
        <Link className="p-2 align-self-start" to={'/'}>{t('cart.continueShopping')}</Link>
        <div className="p-2 align-self-end">{`${t('cart.cartOuter.total')} ${totalAmount}₽`}</div>
      </div>
    </div>
  );
};

const schema = (t: TFunction) => Yup.object().shape({
  firstname: Yup
    .string()
    .required(t('cart.inputErrors.required'))
    .min(3, t('cart.inputErrors.firstname.min'))
    .max(20, t('cart.inputErrors.firstname.max')),
  phoneNumber: Yup
    .string()
    .required(t('cart.inputErrors.required'))
    .length(21, 'Не корректный номер'),
});

type FormField = 'firstname' | 'phoneNumber';

const OrderForm: React.FC = () => {
  const { t } = useTranslation();
  // const inputRef = useRef<HTMLInputElement>(null);
  const { items, totalAmount } = useSelector(getCartState);
  // const apiURL = process.env.NODE_ENV === 'production'
  //   ? process.env.REACT_APP_API_URL_PRODUCTION
  //   : process.env.REACT_APP_API_URL_DEVELOPMENT;

  const formik = useFormik({
    initialValues: {
      firstname: '',
      phoneNumber: '',
    },
    validationSchema: schema(t),
    onSubmit: async (values, { setSubmitting }) => {
      const orderMessage = createOrderMessage(values, items, totalAmount);
      await axios.post(
        `${process.env.REACT_APP_API_URL_DEVELOPMENT}/send-message`,
        { message: formatMessage(orderMessage) },
      )
        .catch((error) => {
          console.error('Form submit request error:', error);
          throw error;
        });

      setSubmitting(false);
    },
  });

  console.log(formik.errors);

  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, []);

  return (
    <div className="order-form">
      <h2 className="p-3">{t('cart.orderForm.title')}</h2>
      <form onSubmit={formik.handleSubmit}>
        {Object.entries(formik.values).map(([fieldName]) => (
          <div key={fieldName} className="m-3">
            {fieldName === 'phoneNumber' ? (
              <PatternFormat
                format="+7 (###) - ### - ####"
                mask=" "
                allowEmptyFormatting
                type="tel"
                name={fieldName}
                value={formik.values[fieldName]}
                onChange={formik.handleChange}
                className={classNames('form-field p-2 rounded-2', {
                  'is-valid': !formik.errors[fieldName],
                  'is-invalid': formik.errors[fieldName],
                })}
              />
            ) : (
              <input
                type="text"
                id={fieldName}
                name={fieldName}
                placeholder={t(`cart.formFields.${fieldName}`)}
                onChange={formik.handleChange}
                value={formik.values[fieldName as FormField]}
                className={classNames('form-field p-2 rounded-2', {
                  'is-valid': !formik.errors[fieldName as FormField],
                  'is-invalid': formik.errors[fieldName as FormField],
                })}
              />
            )}
            {formik.errors[fieldName as FormField] && (
              <div className="invalid-tooltip m-2">{formik.errors[fieldName as FormField]}</div>
            )}
            <label htmlFor={fieldName}></label>
          </div>
        ))}
        <button
          type="submit"
          aria-label="submit-btn"
          className="submit-btn m-3"
          disabled={formik.isSubmitting}
        >
          {t('cart.submitButton')}
        </button>
      </form>
    </div>
  );
};

export const Cart: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items } = useSelector(getCartState);
  const totalAmount = items.reduce((acc, item) => acc + (item.price as number) * item.quantity, 0);

  useEffect(() => {
    dispatch(actions.setTotalAmount(totalAmount));
  });

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
