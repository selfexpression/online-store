import { createSlice } from '@reduxjs/toolkit';

import type { Product } from '../types/interfaces.ts';

interface ProductCardState {
  currentProduct: Product | null;
  productsCount: number;
}

const defaultValue = 1;

const initialState: ProductCardState = {
  currentProduct: null,
  productsCount: defaultValue,
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
    resetCount: (state) => {
      state.productsCount = defaultValue;
    },
  },
});

export const { actions, reducer } = slice;
