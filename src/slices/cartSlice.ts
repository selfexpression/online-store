import { createSlice } from '@reduxjs/toolkit';

// import { addProductToCart } from '../thunks/cartThunks.ts';
import { CartState } from '../types/interfaces.ts';

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
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(addProductToCart.rejected, (state) => {
  //     });
  // },
});

export const { actions, reducer } = slice;
