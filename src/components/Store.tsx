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
  const { goods } = useSelector(getDatabase);
  console.log(goods);

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
      {/* <main>
        <div className="collection-wrapper">
          {goods.map((item) => {
            <div key={item.id} className="collection-item">
              <img src="" alt="" />
              <div className="item-info">
                <h3 className="item-name">{item.name}</h3>
                <span className="item-price">{item.price}</span>
              </div>
            </div>;
          })}
        </div>
      </main> */}
    </header>
  );
};
