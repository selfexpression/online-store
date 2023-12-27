import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useDatabase } from '../hooks/index.ts';
import { actions } from '../slices/index.ts';
import { getDatabaseState, getFilterState, getSortState } from '../utils/selectors.ts';
import { getDatabase } from '../services/firebase.ts';
import { Product, SortedMap } from '../types/interfaces.ts';
import { sortedMap } from '../utils/helpers.ts';

import { ToggleMenu } from './ToggleMenu.tsx';

export const Store: React.FC = () => {
  const db = useDatabase();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products } = useSelector(getDatabaseState);
  const { isFiltered, currentCategoryID } = useSelector(getFilterState);
  const { currentValue } = useSelector(getSortState);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const database = await getDatabase(db, t);
      const filteredProducts = !isFiltered
        ? database.products
        : database.products
          .filter(({ categoryID }) => categoryID === currentCategoryID);
      const sortingFunction = sortedMap[currentValue as keyof SortedMap];
      const result: Product[] = sortingFunction(filteredProducts)
        .sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0));

      const payload = {
        categories: database.categories,
        products: result,
      };

      dispatch(actions.setDatabase(payload));
    };

    loadData();
  }, [currentCategoryID, currentValue]);

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
