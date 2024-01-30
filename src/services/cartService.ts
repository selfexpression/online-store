import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Firestore,
} from 'firebase/firestore';

import type { CartItem } from '../types/interfaces.ts';
import { firebaseApiRoutes } from '../utils/routes.ts';

export const addToDatabaseCart = async (
  userUID: string,
  items: CartItem[],
  db: Firestore,
) => {
  const cartRef = doc(db, firebaseApiRoutes.carts(), userUID);

  await setDoc(cartRef, {
    items,
  }, { merge: true });
};

export const updateCartItems = async (
  userUID: string,
  updatedCartItems: CartItem[],
  db: Firestore,
) => {
  const cartRef = doc(db, firebaseApiRoutes.carts(), userUID);
  await updateDoc(cartRef, { items: updatedCartItems });
};

export const getCurrentUserCart = async (userUID: string, db: Firestore) => {
  const cartRef = doc(db, firebaseApiRoutes.carts(), userUID);
  const cartSnap = await getDoc(cartRef);

  if (!cartSnap.exists()) return null;

  return cartSnap.data().items;
};
