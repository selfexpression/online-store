import type { Firestore } from '@firebase/firestore';

import { store, actions } from '../slices/index.ts';
import type { DatabaseState } from '../types/interfaces.ts';
import { getProductCategoryData } from '../services/databaseService.ts';

export const loadData = async (db: Firestore, databaseState: DatabaseState): Promise<void> => {
  const { categories, products } = databaseState;

  if (!!categories.length || !!products.length) {
    return;
  }

  const database = await getProductCategoryData(db);

  const payload = {
    categories: database.categories,
    products: database.products,
  };

  store.dispatch(actions.setDatabase(payload));
};
