import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { getProductCardState } from '../utils/selectors.ts';
import { getDatabase } from '../services/firebase.ts';
import { useDatabase } from '../hooks/index.ts';
import { actions } from '../slices/index.ts';

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
        {currentProduct?.inStock ? `${currentProduct?.price}₽` : ''}
      </span>
    </div>
  );
};

const AddInfo: React.FC = () => {
  const { t } = useTranslation();
  const { productId } = useParams();
  const categoriesInfo = t('categoriesInfo', { returnObjects: true });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleActive = (category: string): void => {
    setActiveCategory(category !== activeCategory ? category : null);
  };

  return (
    <div className="add-info">
      {Object.keys(categoriesInfo).map((category) => (
        <div
          key={category}
          className="ml-3 mr-3 p-3"
        >
          <span
            className="category-type"
            onClick={() => handleActive(category)}
          >{
              `${t(`categoriesInfo.${category}`)}: `}
          </span>
          <span className={classNames('category-value', {
            'd-block': activeCategory === category,
            'd-none': activeCategory !== category,
          })}>
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

  const handleDecrement = () => {
    dispatch(actions.decrementCount());
  };

  const handleIncrement = () => {
    dispatch(actions.incrementCount());
  };

  return (
    <div className="counter-items m-3">
      <button
        type="button"
        aria-label="decrement"
        onClick={handleDecrement}
        disabled={disabled}
      >
        <MinusIcon />
      </button>
      <span className="p-4">{productsCount}</span>
      <button
        type="button"
        aria-label="increment"
        onClick={handleIncrement}
        disabled={disabled}
      >
        <PlusIcon />
      </button>
    </div>
  );
};

const ProductAddToCard: React.FC = () => {
  const [disabled, setDisabled] = useState(false);
  const { currentProduct } = useSelector(getProductCardState);
  const { t } = useTranslation();

  useEffect(() => {
    setDisabled(currentProduct?.inStock === true);
  }, []);

  return (
    <div className="product-counter mb-5 mt-5">
      <CounterAdjust />
      <button type="button"
        aria-label="add to cart"
        className="mr-3 uppercase"
        disabled={disabled}
      >
        {t('productCard.addToCart')}
      </button>
    </div>
  );
};

export const ProductCard: React.FC = () => {
  const db = useDatabase();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { productId } = useParams();

  useEffect(() => {
    const loadProduct = async () => {
      const { products } = await getDatabase(db, t);
      const [currentProductItem] = products.filter(({ id }) => `${id}` === productId);
      dispatch(actions.setCurrentProduct(currentProductItem));
    };

    loadProduct();
  }, [productId]);

  return (
    <div className="vh-100">
      <div className="product-card-wrapper">
        <img
          src={`/product-images/${productId}.jpg`}
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
