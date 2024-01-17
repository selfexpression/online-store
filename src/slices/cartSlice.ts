import { createSlice } from '@reduxjs/toolkit';

import type { CartItem } from '../types/interfaces';

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const slice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const { items } = state;
      const { id, quantity } = payload;
      const existingItem = items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
        return;
      }

      state.items = [...items, payload];
    },
    setCartItems: (state, { payload }) => {
      state.items = [...state.items, ...payload];
    },
    setTotalAmount: (state, { payload }) => {
      state.totalAmount = payload;
    },
    updateQuantity: (state, { payload }) => {
      const { items } = state;
      const { id, type } = payload;
      const currentItem = items.find((item) => item.id === id);

      if (!currentItem) {
        return;
      }

      switch (type) {
        case 'increment':
          currentItem.quantity += 1;
          break;
        case 'decrement': {
          if (currentItem.quantity <= 1) {
            const filteredItems = items.filter((item) => item.id !== id);
            state.items = filteredItems;
          }

          currentItem.quantity -= 1;
          break;
        }
        default:
          break;
      }
    },
  },
});

export const { actions, reducer } = slice;
