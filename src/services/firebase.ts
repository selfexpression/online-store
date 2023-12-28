import {
  query, collection, getDocs, Firestore,
} from '@firebase/firestore';

import { Product, Category, FirebaseData } from '../types/interfaces.ts';
import { isValidProduct } from '../types/predicates.ts';

const getProducts = async (db: Firestore): Promise<Product[]> => {
  const queryCollection = query(collection(db, 'products'));
  const querySnapshotByProducts = await getDocs(queryCollection);

  const products: Product[] = querySnapshotByProducts.docs.map((doc) => {
    const docData = doc.data() as Product;

    if (!isValidProduct(docData)) {
      console.error('Invalid data received from the database');
    }

    return docData;
  });

  return products;
};

const getCategories = async (db: Firestore): Promise<Category[]> => {
  const queryCategories = query(collection(db, 'categories'));
  const querySnapshotByCategories = await getDocs(queryCategories);

  const categories: Category[] = querySnapshotByCategories.docs.map((doc) => {
    const docData = doc.data() as Category;
    return docData;
  });

  return categories;
};

export const getFirebaseData = async (db: Firestore): Promise<FirebaseData> => {
  try {
    const categories = await getCategories(db);
    const products = await getProducts(db);

    const payload = {
      categories,
      products,
    };

    return payload;
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
};
