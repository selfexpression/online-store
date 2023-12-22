import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { useDatabase } from '../hooks/index.ts';
import { actions } from '../slices/index.ts';
import { getDatabaseStore, getFilterStore, getSortStore } from '../utils/selectors.ts';
import { getDatabase } from '../services/services.ts';
import { Product, SortedMap } from '../types/interfaces.ts';
import { sortedMap } from '../utils/helpers.ts';

export const Store: React.FC = () => {
  const db = useDatabase();
  const dispatch = useDispatch();
  const { products } = useSelector(getDatabaseStore);
  const { isFiltered, currentCategoryID } = useSelector(getFilterStore);
  const { currentValue } = useSelector(getSortStore);

  useEffect(() => {
    const loadData = async (): Promise<void> => {
      const database = await getDatabase(db);
      const filteredProducts = !isFiltered
        ? database.products
        : database.products
          .filter(({ categoryID }) => categoryID === currentCategoryID);
      const sortingFunction = sortedMap[currentValue as keyof SortedMap];
      const result: Product[] = sortingFunction(filteredProducts)
        .sort((a, b) => (b.inStock ? 1 : 0) - (a.inStock ? 1 : 0));

      const payload = {
        products: result,
        categories: database.categories,
      };

      dispatch(actions.setDatabase(payload));
    };

    loadData();
  }, [currentCategoryID, currentValue]);

  return (
    <header>
      <main className="collection-products">
        <div className="collection-wrapper">
          {products.map(({
            name, id, price, brand, inStock,
          }) => (
            <div key={id} className="collection-item">
              <img
                src={`product-images/${id}.jpg`}
                alt={name}
                loading="lazy"
                className={classNames('item-image', { 'out-of-stock': !inStock })}
              />
              <div className="uppercase text-center p-2">
                <h3 className="p-0 mb-3">{`${brand} ${name}`}</h3>
                <span className="item-price">
                  {price ? `${price}₽` : 'Нет в наличии'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </header>
  );
};
