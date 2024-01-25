import React, { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useFormik, type FormikValues } from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';
import type { TFunction } from 'i18next';
import { PatternFormat } from 'react-number-format';

import { getCartState } from '../utils/selectors.ts';
import { useFirestore, useAuth } from '../hooks/index.ts';
import { updateCart, emptyTrash } from '../thunks/cartThunks.ts';
import type { AppDispatch } from '../types/aliases.ts';
import cartImage from '../assets/images/cart-image.png';
import { formatMessage, createOrderMessage } from '../utils/helpers.ts';
import { actions } from '../slices/index.ts';
import { routes as frontendRoutes, routes } from '../utils/routes.ts';

import { QuantityControl } from './QuantityControl.tsx';

const CartQuantityControl: React.FC<{ currentId: number }> = ({ currentId }) => {
  const userUID = useAuth();
  const db = useFirestore();
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector(getCartState);
  const currentItem = items.find((item) => item.id === currentId);
  const id = currentItem?.id as number;
  const quantity = currentItem?.quantity as number;

  const handleUpdate = (type: string) => {
    const payload = {
      userUID,
      db,
      id,
      type,
    };

    dispatch(updateCart(payload));
  };

  return (
    <QuantityControl
      handler={handleUpdate}
      quantity={quantity}
    />
  );
};

const CartItem: React.FC = () => {
  const { items } = useSelector(getCartState);

  return (
    useMemo(() => items.map(({
      brand, name, price, id, imageURL,
    }) => (
      <tr key={id} className="cart-item">
        <td className="cart-product-img p-2">
          <img src={imageURL} alt={name} className="mr-5"/>
          <div className="small-screen-item">
            <div className="aqua-color p-2">
              <Link className="no-decoration" to={frontendRoutes.productLink(id)} >{`${brand} ${name}`}</Link>
            </div>
            <div className="p-2 aqua-color">{`${price}₽`}</div>
          </div>
        </td>
        <td className="item-name text-start aqua-color">
          <Link className="no-decoration" to={frontendRoutes.productLink(id)} >{`${brand} ${name}`}</Link>
        </td>
        <td className="item-price text-center mr-5">{`${price}₽`}</td>
        <td className="text-center">
          <CartQuantityControl currentId={id} />
        </td>
      </tr>
    )), [items])
  );
};

const CartOuter: React.FC = () => {
  const { t } = useTranslation();
  const { totalAmount } = useSelector(getCartState);

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
          <CartItem />
        </tbody>
      </table>
      <div className="d-flex align-items-center justify-content-between">
        <Link className="p-2 align-self-start no-decoration" to={'/'}>{t('cart.continueShopping')}</Link>
        <div className="p-2 align-self-end">{`${t('cart.cartOuter.total')} ${totalAmount}₽`}</div>
      </div>
    </div>
  );
};

const schema = (t: TFunction) => Yup.object().shape({
  firstname: Yup
    .string()
    .required(t('cart.inputErrors.required')),
  phoneNumber: Yup
    .string()
    .required(t('cart.inputErrors.required'))
    .matches(/(.*\d.*){11}/, t('cart.inputErrors.matches')),
});

type FormField = 'phoneNumber' | 'firstname'

interface FieldProps {
  fieldName: FormField;
  formik: FormikValues;
}

const FirstnameField: React.FC<FieldProps> = ({ fieldName, formik }) => {
  const { t } = useTranslation();

  return (
    <input
      type="text"
      id={fieldName}
      name={fieldName}
      placeholder={t(`cart.formFields.${fieldName}`)}
      onChange={formik.handleChange}
      value={formik.values[fieldName]}
      className={classNames('form-field p-2 rounded-2', {
        'is-valid': !formik.errors[fieldName],
        'is-invalid': formik.errors[fieldName],
      })}
    />
  );
};

const PhoneNumberField: React.FC<FieldProps> = ({ fieldName, formik }) => (
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
);

const OrderForm: React.FC = () => {
  const userUID = useAuth();
  const db = useFirestore();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
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

      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL_DEVELOPMENT}${routes.sendMessageApi()}`,
          { message: formatMessage(orderMessage) },
        );

        dispatch(actions.toggleOrderStatus(true));
        dispatch(emptyTrash({ userUID, db }));
        setTimeout(() => dispatch(actions.toggleOrderStatus(false)), 5000);
      } catch (error) {
        console.error('Form submit request error:', error);
        throw error;
      }

      setSubmitting(false);
    },
  });

  return (
    <div className="order-form">
      <h2 className="p-3">{t('cart.orderForm.title')}</h2>
      <form onSubmit={formik.handleSubmit}>
        {Object.entries(formik.values).map(([fieldName]) => (
          <div key={fieldName} className="m-3">
            {fieldName === 'phoneNumber' ? (
              <PhoneNumberField fieldName={fieldName} formik={formik} />
            ) : (
              <FirstnameField fieldName={fieldName as FormField} formik={formik} />
            )}
            <div className="invalid-tooltip m-2">{formik.errors[fieldName as FormField]}</div>
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

const EmptyCart: React.FC = () => {
  const { isOrderPlaced, isLoaded } = useSelector(getCartState);
  const { t } = useTranslation();

  return (
    isLoaded ? (
      <div className="cart-container vh-100">
        <div className="empty-cart-items">
          {isOrderPlaced ? (
            <>
              <span className="p-1">{`${t('cart.thanksForBuying')} `}</span>
              <span className="p-1">{`${t('cart.shoppingCompleted')} `}</span></>
          ) : (
            <>
              <img src={cartImage} alt="cart" className="empty-cart-image" />
              <span>{`${t('cart.emptyCart')} `}</span>
            </>
          )}
          <Link to={routes.mainPage()}>{t('cart.continueShopping')}</Link>
        </div>
      </div>
    ) : (
      <div className="spinner-loader" />
    )
  );
};

export const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items } = useSelector(getCartState);
  const totalAmount = items.reduce((acc, item) => acc + (item.price as number) * item.quantity, 0);

  useEffect(() => {
    dispatch(actions.setTotalAmount(totalAmount));
  });

  return (
    !items.length
      ? (
        <EmptyCart />
      ) : (
        <div className="cart-container">
          <div className="cart-wrapper">
            <CartOuter />
            <OrderForm />
          </div>
        </div>
      )
  );
};
