import {
  query, collection, getDocs, Firestore,
} from '@firebase/firestore';

import { Product, Category, DatabaseState } from '../types/interfaces.ts';
import { isValidProduct } from '../types/predicates.ts';

export const dataLoading = async (db: Firestore): Promise<DatabaseState> => {
  try {
    // const queryCollection = query(collection(db, 'products'), where('categoryID', '==', 1));
    const queryCollection = query(collection(db, 'products'));
    const queryCategories = query(collection(db, 'categories'));
    const querySnapshotByCategories = await getDocs(queryCategories);
    const querySnapshotByProducts = await getDocs(queryCollection);
    const products: Product[] = querySnapshotByProducts.docs.map((doc) => {
      const docData = doc.data() as Product;

      if (!isValidProduct(docData)) {
        console.error('Invalid data received from the database');
      }

      return docData;
    });
    const categories: Category[] = querySnapshotByCategories.docs.map((doc) => {
      const docData = doc.data() as Category;
      return docData;
    });

    const payload = {
      products,
      categories,
    };

    return payload;
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
};
