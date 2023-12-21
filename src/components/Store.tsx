import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useDatabase } from '../hooks/index.ts';
import { actions } from '../slices/index.ts';
import { getDatabase } from '../utils/selectors.ts';
import { dataLoading } from '../services/services.ts';

export const Store: React.FC = () => {
  const db = useDatabase();
  const dispatch = useDispatch();
  const { products } = useSelector(getDatabase);

  useEffect(() => {
    const loadData = async () => {
      const payload = await dataLoading(db);
      dispatch(actions.setDatabase(payload));
    };

    loadData();
  }, []);

  return (
    <header>
      <main className="collection-products">
        <div className="collection-wrapper">
          {products.map(({
            name, id, price, brand,
          }) => (
            <div key={id} className="collection-item">
              <img
                src={`assets/product-images/${id}.jpg`}
                alt={name}
                loading="lazy"
                className="item-image"
              />
              <div className="text-center">
                <h3>{`${brand} ${name}`}</h3>
                <span>{`${price}₽`}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </header>
  );
};
