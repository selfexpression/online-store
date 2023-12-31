import { createAsyncThunk } from '@reduxjs/toolkit';
import { Firestore } from '@firebase/firestore';

import { addToDatabaseCart, getCurrentUserCart } from '../services/cartService.ts';
import { actions } from '../slices/cartSlice.ts';
import type { CartAsyncThunkPayload, CartItem } from '../types/interfaces.ts';
import type { RootState } from '../types/aliases.ts';

export const addProductToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ cartItem, userUID, db }: CartAsyncThunkPayload, { dispatch, getState }) => {
    dispatch(actions.addToCart(cartItem));

    const state = getState() as RootState;
    const updatedCartItems = state.cart.items;

    try {
      await addToDatabaseCart(userUID, updatedCartItems, db);
    } catch (error) {
      console.error('Error updating the cart in Firestore:', error);
      throw error;
    }
  },
);

export const syncCartWithDatabase = createAsyncThunk(
  'cart/syncWithDatabase',
  async ({ userUID, db }: { userUID: string, db: Firestore }, { dispatch }) => {
    if (!userUID) {
      return;
    }

    try {
      const cartItems: CartItem[] = await getCurrentUserCart(userUID, db);
      dispatch(actions.setCartItems(cartItems));
    } catch (error) {
      console.error('Error loading the cart in Firestore:', error);
      throw error;
    }
  },
);
