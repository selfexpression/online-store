import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  Firestore,
} from 'firebase/firestore';

import type { CartItem } from '../types/interfaces.ts';

export const addToDatabaseCart = async (
  userUID: string,
  items: CartItem[],
  db: Firestore,
) => {
  const cartRef = doc(db, 'carts', userUID);

  await setDoc(cartRef, {
    items,
  }, { merge: true });
};

export const getCurrentUserCart = async (userUID: string, db: Firestore) => {
  const cartRef = doc(db, 'carts', userUID);
  const cartSnap = await getDoc(cartRef);

  if (!cartSnap.exists()) {
    return null;
  }

  return cartSnap.data().items;
};

export const removeFromDatabaseCart = async (
  userUID: string,
  updatedCartItems: CartItem[],
  db: Firestore,
) => {
  const cartRef = doc(db, 'carts', userUID);
  await updateDoc(cartRef, { items: updatedCartItems });
};
