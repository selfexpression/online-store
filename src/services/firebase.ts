import {
  query, collection, getDocs, Firestore,
} from '@firebase/firestore';
import { TFunction } from 'i18next';

import { Product, Category } from '../types/interfaces.ts';
import { Database } from '../types/aliases.ts';
import { isValidProduct } from '../types/predicates.ts';

export const getDatabase = async (db: Firestore, t: TFunction): Promise<Database> => {
  try {
    const queryCollection = query(collection(db, 'products'));
    const queryCategories = query(collection(db, 'categories'));
    const querySnapshotByCategories = await getDocs(queryCategories);
    const querySnapshotByProducts = await getDocs(queryCollection);
    const products: Product[] = querySnapshotByProducts.docs.map((doc) => {
      const docData = doc.data() as Product;

      if (!isValidProduct(docData)) {
        console.error(t('errors.isValidProduct'));
      }

      return docData;
    });
    const categories: Category[] = querySnapshotByCategories.docs.map((doc) => {
      const docData = doc.data() as Category;
      return docData;
    });

    const payload = {
      categories,
      products,
    };

    return payload;
  } catch (error) {
    console.error(t('errors.loadingData'), error);
    throw error;
  }
};