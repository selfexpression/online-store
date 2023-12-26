import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { getProductCardState } from '../utils/selectors.ts';
import { getDatabase } from '../services/services.ts';
import { useDatabase } from '../hooks/index.ts';
import { actions } from '../slices/index.ts';

export const ProductCard: React.FC = () => {
  const db = useDatabase();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { currentProduct } = useSelector(getProductCardState);
  const categoriesInfo = t('categoriesInfo', { returnObjects: true });

  useEffect(() => {
    const loadProduct = async () => {
      const { products } = await getDatabase(db, t);
      const [currentProductItem] = products.filter(({ id }) => `${id}` === productId);
      dispatch(actions.setCurrentProduct(currentProductItem));
    };

    loadProduct();
  }, []);

  return (
    <div className="vh-100">
      <div className="product-card-wrapper">
        <img
          src={`/product-images/${productId}.jpg`}
          alt={`collection item ${productId}`}
          className="product-card-image"
        />
        <div className="product-card-main-info">
          <h1 className="uppercase m-0">
            {currentProduct?.brand}
          </h1>
          <h1 className="uppercase m-0">
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
        <div className="product-info">
          {Object.keys(categoriesInfo).map((category, index) => (
            <div
              key={index}
              className="m-1"
            >
              <span className="category-type">{
                `${t(`categoriesInfo.${category}`)}: `}
              </span>
              <span className="category-value">
                {t(`products.${productId}.${category}`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
