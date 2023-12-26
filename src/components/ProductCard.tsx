import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { getProductCardState } from '../utils/selectors.ts';
import { getDatabase } from '../services/firebase.ts';
import { useDatabase } from '../hooks/index.ts';
import { actions } from '../slices/index.ts';

const MainInfo: React.FC = () => {
  const { t } = useTranslation();
  const { currentProduct } = useSelector(getProductCardState);

  return (
    <div className="product-card-main-info p-3 mt-3">
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
          className="p-3"
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
        <AddInfo />
      </div>
    </div>
  );
};