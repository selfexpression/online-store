import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useDatabase } from '../hooks/index.ts';
import { getDatabaseState, getFilterState } from '../utils/selectors.ts';
import { loadData } from '../services/loaders.ts';

import { ToggleMenu } from './ToggleMenu.tsx';

export const Store: React.FC = () => {
  const db = useDatabase();
  const { t } = useTranslation();
  const database = useSelector(getDatabaseState);
  const { isFiltered } = useSelector(getFilterState);
  const products = !isFiltered ? database.products : database.filteredProducts;

  useEffect(() => {
    loadData(db, database);
  }, []);

  return (
    <header>
      <ToggleMenu />
      <main className="collection-products">
        <div className="collection-wrapper">
          {products.map(({
            name, id, price, brand, inStock,
          }) => (
            <div key={id} className="collection-item scale-up">
              <Link className="no-decoration" to={`/product/${id}`}>
                <img
                  src={`/product-images/${id}.jpg`}
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
    </header>
  );
};
