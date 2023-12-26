import { createSlice } from '@reduxjs/toolkit';

import { ProductCardState, Product } from '../types/interfaces.ts';

const initialState: ProductCardState = {
  currentProduct: null,
  productsCount: 1,
};

const slice = createSlice({
  name: 'productCard',
  initialState,
  reducers: {
    setCurrentProduct: (state, { payload }: { payload: Product }) => {
      state.currentProduct = payload;
    },
    incrementCount: (state) => {
      state.productsCount += 1;
    },
    decrementCount: (state) => {
      if (state.productsCount > 1) {
        state.productsCount -= 1;
      }
    },
  },
});

export const { actions, reducer } = slice;
