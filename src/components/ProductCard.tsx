import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { getProductCardState, getDatabaseState } from '../utils/selectors.ts';
import { useFirestore, useAuth } from '../hooks/index.ts';
import { actions } from '../slices/productCardSlice.ts';
import { loadData } from '../thunks/databaseThunks.ts';
import { addProductToCart } from '../thunks/cartThunks.ts';
import type { AppDispatch } from '../types/aliases.ts';

import { QuantityControl } from './QuantityControl.tsx';

const MainInfo: React.FC = () => {
  const { t } = useTranslation();
  const { currentProduct } = useSelector(getProductCardState);

  if (!currentProduct) return null;

  return (
    <div className="product-card-main-info m-3">
      <h1 className="product-brand m-0">
        {currentProduct.brand}
      </h1>
      <h1 className="product-name m-0">
        {currentProduct.name}
      </h1>
      <span
        className={classNames('d-block', {
          'product-stock': currentProduct.inStock,
          'product-out-stock': !currentProduct.inStock,
        })}
      >
        {currentProduct.inStock ? t('store.inStock') : t('store.outOfStock')}
      </span>
      <span className="product-price mt-3 d-block">
        {currentProduct.inStock ? `${currentProduct.price}₽` : ''}
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
        <div key={category} className="p-3">
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
    <QuantityControl
      handler={handleCounterСontrol}
      quantity={productsCount}
      disabled={disabled}
    />
  );
};

const ProductAddToCard: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  const userUID = useAuth();
  const db = useFirestore();
  const { productsCount, currentProduct, productIsAdded } = useSelector(getProductCardState);
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  useEffect(() => {
    setDisabled(!currentProduct?.inStock);
  }, [currentProduct]);

  const handleAddToCart = () => {
    if (!currentProduct) return;

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
    dispatch(actions.setProductAdded(true));
    dispatch(actions.resetCount());
    setTimeout(() => dispatch(actions.setProductAdded(false)), 3000);
  };

  return (
    <div className="product-counter">
      <CounterAdjust />
      <button type="button"
        aria-label="add to cart"
        className="mr-3 uppercase"
        disabled={disabled}
        onClick={handleAddToCart}
      >
        {productIsAdded ? t('productCard.addedToCart') : t('productCard.addToCart')}
      </button>
    </div>
  );
};

export const ProductCard: React.FC = () => {
  const db = useFirestore();
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const databaseState = useSelector(getDatabaseState);
  const currentProduct = databaseState.products.find(({ id }) => `${id}` === productId);

  useEffect(() => {
    dispatch(loadData({ db }));
    if (!currentProduct) return;

    dispatch(actions.setCurrentProduct(currentProduct));
  }, [currentProduct]);

  return (
    <div className="max-content">
      {!currentProduct ? (
        <div className="spinner-loader" />
      ) : (
        <div className="product-card-wrapper">
          <img
            src={currentProduct.imageURL}
            alt={`collection item ${productId}`}
            className="product-card-image scale-up p-4"
          />
          <MainInfo />
          <ProductAddToCard />
          <AddInfo />
        </div>
      )}
    </div>
  );
};
