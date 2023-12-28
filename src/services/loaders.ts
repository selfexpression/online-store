import { Firestore } from '@firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';

import { store, actions } from '../slices/index.ts';
import { Database } from '../types/interfaces.ts';

import { getFirebaseData } from './firebase.ts';

export const loadData = async (
  db: Firestore,
  databaseState: Database,
  storage: FirebaseStorage,
): Promise<void> => {
  const { categories, products } = databaseState;
  if (!!categories.length || !!products.length) {
    return;
  }

  const database = await getFirebaseData(db, storage);

  const payload = {
    categories: database.categories,
    products: database.products,
  };

  store.dispatch(actions.setDatabase(payload));
};
