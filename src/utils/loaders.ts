import type { Firestore } from '@firebase/firestore';

import { store, actions } from '../slices/index.ts';
import type { Database } from '../types/interfaces.ts';
import { getFirebaseData } from '../services/databaseService.ts';

export const loadData = async (db: Firestore, databaseState: Database): Promise<void> => {
  const { categories, products } = databaseState;

  if (!!categories.length || !!products.length) {
    return;
  }

  const database = await getFirebaseData(db);

  const payload = {
    categories: database.categories,
    products: database.products,
  };

  store.dispatch(actions.setDatabase(payload));
};
