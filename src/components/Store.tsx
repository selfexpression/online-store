import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useFirestore } from '../hooks/index.ts';
import { getDatabaseState, getFilterState } from '../utils/selectors.ts';
import { loadData } from '../thunks/databaseThunks.ts';
import type { AppDispatch } from '../types/aliases.ts';

import { ToggleMenu } from './ToggleMenu.tsx';

export const Store: React.FC = () => {
  const db = useFirestore();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { products, filteredProducts, isLoaded } = useSelector(getDatabaseState);
  const { isFiltered } = useSelector(getFilterState);
  const currentProducts = !isFiltered ? products : filteredProducts;

  useEffect(() => {
    dispatch(loadData({ db }));
  }, []);

  return (
    <header>
      <ToggleMenu />
      <main className="collection-products">
        <div className="collection-wrapper">
          {currentProducts.map(({
            name, id, price, brand, inStock, imageURL,
          }) => (
            <div key={id} className="collection-item scale-up">
              <Link className="no-decoration" to={`/product/${id}`}>
                <img
                  src={imageURL}
                  alt={name}
                  loading="lazy"
                  className={classNames('item-image', { 'out-of-stock': !inStock })}
                />
                <div className="uppercase text-center p-3">
                  <h3 className="p-0 mb-2">{`${brand} ${name}`}</h3>
                  <span className="bold m-0">
                    {price ? `${price}₽` : t('store.outOfStock')}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
      {!isLoaded ? <div className="spinner-loader" /> : '' }
    </header>
  );
};
