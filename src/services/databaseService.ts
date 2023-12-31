import {
  query, collection, getDocs, Firestore,
} from '@firebase/firestore';
import {
  ref, getDownloadURL, getStorage,
} from 'firebase/storage';

import type { Product, Category, ProductCategoryData } from '../types/interfaces.ts';
import { isValidProduct } from '../types/predicates.ts';

const getProducts = async (db: Firestore): Promise<Product[]> => {
  const queryCollection = query(collection(db, 'products'));
  const querySnapshotByProducts = await getDocs(queryCollection);
  const storage = getStorage();

  const productPromises: Promise<Product>[] = querySnapshotByProducts.docs.map(async (doc) => {
    const product = doc.data() as Product;

    if (!isValidProduct(product)) {
      console.error('Invalid data received from the database');
    }

    const imageRef = ref(storage, `product-images/${product.id}.jpg`);

    try {
      const imageURL = await getDownloadURL(imageRef);
      return { ...product, imageURL };
    } catch (error) {
      console.error(`Error loading image for product ${product.id}:`, error);
    }

    return product;
  });

  const products = Promise.all(productPromises);
  return products;
};

const getCategories = async (db: Firestore): Promise<Category[]> => {
  const queryCategories = query(collection(db, 'categories'));
  const querySnapshotByCategories = await getDocs(queryCategories);

  const categories: Category[] = querySnapshotByCategories.docs.map((doc) => {
    const category = doc.data() as Category;
    return category;
  });

  return categories;
};

export const getProductCategoryData = async (db: Firestore): Promise<ProductCategoryData> => {
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
