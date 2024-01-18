import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { getProductCardState, getDatabaseState } from '../utils/selectors.ts';
import { useDatabase, useAuth } from '../hooks/index.ts';
import { actions } from '../slices/index.ts';
import { loadData } from '../thunks/databaseThunks.ts';
import { addProductToCart } from '../thunks/cartThunks.ts';
import type { AppDispatch } from '../types/aliases.ts';

import { MinusIcon } from './Icons/MinusIcon.tsx';
import { PlusIcon } from './Icons/PlusIcon.tsx';

const MainInfo: React.FC = () => {
  const { t } = useTranslation();
  const { currentProduct } = useSelector(getProductCardState);

  return (
    <div className="product-card-main-info p-3 m-3">
      <h1 className="product-brand m-0">
        {currentProduct?.brand}
      </h1>
      <h1 className="product-name m-0">
        {currentProduct?.name}
      </h1>
      <span
        className={classNames('d-block', {
          'product-stock': currentProduct?.inStock,
          'product-out-stock': !currentProduct?.inStock,
        })}
      >
        {currentProduct?.inStock ? t('store.inStock') : t('store.outOfStock')}
      </span>
      <span className="product-price mt-3 d-block">
        {currentProduct?.inStock ? `${currentProduct.price}₽` : ''}
      </span>
    </div>
  );
};

const AddInfo: React.FC = () => {
  const { t } = useTranslation();
  const { productId } = useParams();
  const categoriesInfo = t('productCard.categoriesInfo', { returnObjects: true });

  return (
    <div className="add-info">
      {Object.keys(categoriesInfo).map((category) => (
        <div
          key={category}
          className="ml-3 mr-3 p-3"
        >
          <span
            className="category-type"
          >{
              `${t(`productCard.categoriesInfo.${category}`)}: `}
          </span>
          <span className="category-value">
            {t(`products.${productId}.${category}`)}
          </span>
        </div>
      ))}
    </div>
  );
};

const CounterAdjust: React.FC = () => {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const { productsCount, currentProduct } = useSelector(getProductCardState);

  useEffect(() => {
    setDisabled(!currentProduct?.inStock);
    dispatch(actions.resetCount());
  }, [currentProduct?.inStock]);

  const handleCounterСontrol = (type: string) => {
    dispatch(actions.updateCounter(type));
  };

  return (
    <div className="counter-items m-3">
      <button
        type="button"
        aria-label="decrement"
        onClick={() => handleCounterСontrol('decrement')}
        disabled={disabled}
      >
        <MinusIcon />
      </button>
      <span className="p-4">{productsCount}</span>
      <button
        type="button"
        aria-label="increment"
        onClick={() => handleCounterСontrol('increment')}
        disabled={disabled}
      >
        <PlusIcon />
      </button>
    </div>
  );
};

const ProductAddToCard: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  const userUID = useAuth();
  const db = useDatabase();
  const { productsCount, currentProduct } = useSelector(getProductCardState);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    setDisabled(!currentProduct?.inStock);
  }, [currentProduct]);

  const handleAddToCart = () => {
    if (!currentProduct) {
      return;
    }

    const cartItem = {
      id: currentProduct.id,
      brand: currentProduct.brand,
      name: currentProduct.name,
      quantity: productsCount,
      price: currentProduct.price,
      imageURL: currentProduct.imageURL,
    };

    const payload = {
      db,
      userUID,
      cartItem,
    };

    dispatch(addProductToCart(payload));
    dispatch(actions.resetCount());
  };

  return (
    <div className="product-counter mb-5 mt-5">
      <CounterAdjust />
      <button type="button"
        aria-label="add to cart"
        className="mr-3 uppercase"
        disabled={disabled}
        onClick={handleAddToCart}
      >
        {t('productCard.addToCart')}
      </button>
    </div>
  );
};

export const ProductCard: React.FC = () => {
  const db = useDatabase();
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const databaseState = useSelector(getDatabaseState);
  const [currentProduct] = databaseState.products.filter(({ id }) => `${id}` === productId);

  useEffect(() => {
    dispatch(loadData({ db }));
    dispatch(actions.setCurrentProduct(currentProduct));
  }, [currentProduct]);

  return (
    <div className="vh-100">
      <div className="product-card-wrapper">
        <img
          src={currentProduct?.imageURL}
          alt={`collection item ${productId}`}
          className="product-card-image scale-up p-4"
        />
        <MainInfo />
        <ProductAddToCard />
        <AddInfo />
      </div>
    </div>
  );
};
