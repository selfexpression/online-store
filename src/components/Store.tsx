import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  collection, getDocs, query,
} from 'firebase/firestore';

import { useDatabase } from '../hooks/index.ts';
import { Database, Product } from '../types/aliases.ts';
import { isValidProduct } from '../types/predicates.ts';
import { actions } from '../slices/index.ts';
import { getDatabase } from '../utils/selectors.ts';

export const Store: React.FC = () => {
  const db = useDatabase();
  const dispatch = useDispatch();
  const { products } = useSelector(getDatabase);

  useEffect(() => {
    const dataLoading = async (): Promise<void> => {
      try {
        // const queryCollection = query(collection(db, 'products'), where('categoryID', '==', 1));
        const queryCollection = query(collection(db, 'products'));
        const querySnapshot = await getDocs(queryCollection);
        const database: Database = querySnapshot.docs.map((doc) => {
          const docData = doc.data() as Product;

          if (!isValidProduct(docData)) {
            console.error('Invalid data received from the database');
          }

          return docData;
        });

        dispatch(actions.setDatabase(database));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    dataLoading();
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
