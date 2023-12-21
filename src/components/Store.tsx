import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useDatabase } from '../hooks/index.ts';
import { actions } from '../slices/index.ts';
import { getDatabaseStore, getNavFilterStore } from '../utils/selectors.ts';
import { getDatabase } from '../services/services.ts';

export const Store: React.FC = () => {
  const db = useDatabase();
  const dispatch = useDispatch();
  const { products } = useSelector(getDatabaseStore);
  const { isFiltered, currentCategoryID } = useSelector(getNavFilterStore);

  useEffect(() => {
    const loadData = async () => {
      const database = await getDatabase(db);
      const filteredProducts = !isFiltered
        ? database.products
        : database.products.filter(({ categoryID }) => categoryID === currentCategoryID);

      const payload = {
        products: filteredProducts,
        categories: database.categories,
      };

      dispatch(actions.setDatabase(payload));
    };

    loadData();
  }, [currentCategoryID]);

  return (
    <header>
      <main className="collection-products">
        <div className="collection-wrapper">
          {products.map(({
            name, id, price, brand,
          }) => (
            <div key={id} className="collection-item">
              <img
                src={`product-images/${id}.jpg`}
                alt={name}
                loading="lazy"
                className="item-image"
              />
              <div className="uppercase text-center">
                <h3>{`${brand} ${name}`}</h3>
                <span>{price ? `${price}₽` : ''}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </header>
  );
};
